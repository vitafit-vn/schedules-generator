import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import _ from 'lodash';
import fp from 'lodash/fp';
import { DateTime } from 'luxon';
import LZString from 'lz-string';
import shajs from 'sha.js';

import * as axios from './axios';

export function buildPermalink(service, data) {
  const stringified = JSON.stringify(data);
  const compressed = LZString.compressToEncodedURIComponent(stringified);
  return `${process.env.PUBLIC_PATH}/${service}?${compressed}`;
}

export function buildNavConfigs(navList) {
  const singleNavs = [];
  const navWithSubs = {};

  _.each(navList, nav => {
    if (!_.isEmpty(nav.path) && _.isEmpty(nav.parent)) {
      singleNavs.push(nav);
      return;
    }

    if (_.isEmpty(nav.path)) {
      navWithSubs[nav.key] = { ...nav, subNavs: [] };
      return;
    }

    if (!_.isEmpty(nav.parent)) {
      navWithSubs[nav.parent].subNavs.push(nav);
    }
  });

  return [...singleNavs, ..._.values(navWithSubs)];
}

export function calculateAge(birthYear) {
  const { years: diffs } = DateTime.local()
    .diff(DateTime.fromObject({ year: birthYear }), 'years')
    .toObject();

  return Math.floor(diffs);
}

export function computeChecksum(...args) {
  return shajs('sha1')
    .update(_.join(args, '_'))
    .digest('hex');
}

export function convertWeekPeriod(weekPeriod) {
  const weekNumber = fp.flow(
    fp.split('-'),
    fp.last,
    fp.replace(/^w/i, '')
  )(weekPeriod);

  return DateTime.fromObject({ weekNumber });
}

export function parsePermalink() {
  try {
    const url = new URL(window.location.href);
    const base64 = _.replace(url.search, /^\?/, '');
    const decompressed = LZString.decompressFromEncodedURIComponent(base64);
    return JSON.parse(decompressed);
  } catch (error) {
    return {};
  }
}

export async function zipAndSave(files, zipFileName) {
  const zip = new JSZip();
  _.each(files, ({ content, fileName }) => zip.file(fileName, content));
  const downloadContent = await zip.generateAsync({ type: 'blob' });
  saveAs(downloadContent, zipFileName);
}

export { axios };
