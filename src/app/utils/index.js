import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import _ from 'lodash';
import fp from 'lodash/fp';
import { DateTime } from 'luxon';
import qs from 'qs';
import shajs from 'sha.js';

import * as axios from './axios';

export function buildPermalink(service, data) {
  const stringified = qs.stringify(data);
  const base64 = window.btoa(stringified);
  return `${process.env.PUBLIC_PATH}/${service}?${base64}`;
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
    const decoded = window.atob(base64);
    return qs.parse(decoded);
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
