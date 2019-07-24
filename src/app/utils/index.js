import _ from 'lodash';
import fp from 'lodash/fp';
import { DateTime } from 'luxon';
import shajs from 'sha.js';

import * as axios from './axios';

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

export { axios };
