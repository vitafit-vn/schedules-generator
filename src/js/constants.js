import _ from 'lodash';
import $ from 'lodash/fp';

// Locals
import DAILY_SCHEDULES_BEGINNER from './configs/daily_schedules_beginner.json';
import DAILY_SCHEDULES_INTERMEDIATE from './configs/daily_schedules_intermediate.json';
import WEEKLY_SCHEDULES from './configs/weekly_schedules.json';

const DAILY_SCHEDULES = {
  BEGINNER: DAILY_SCHEDULES_BEGINNER,
  INTERMEDIATE: DAILY_SCHEDULES_INTERMEDIATE,
};

const WEEKLY_CODES = _.map(WEEKLY_SCHEDULES, 'code');
const WEEK_NUMBERS_BY_CODE = $.flow(
  $.map(({ byWeeks, code }) => [code, _.map(byWeeks, 'weekNumber')]),
  $.fromPairs,
)(WEEKLY_SCHEDULES);

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

export {
  DAILY_SCHEDULES, WEEKDAYS, WEEKLY_CODES, WEEKLY_SCHEDULES, WEEK_NUMBERS_BY_CODE,
};
