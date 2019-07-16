import _ from 'lodash';

// Locals
import DAILY_SCHEDULES_BEGINNER from './configs/daily_schedules_beginner.json';
import DAILY_SCHEDULES_INTERMEDIATE from './configs/daily_schedules_intermediate.json';
import WEEKLY_SCHEDULES from './configs/weekly_schedules.json';

const DAILY_SCHEDULES = {
  BEGINNER: DAILY_SCHEDULES_BEGINNER,
  INTERMEDIATE: DAILY_SCHEDULES_INTERMEDIATE,
};

const WEEKLY_CODES = _.uniq(_.map(WEEKLY_SCHEDULES, 'code'));
const WEEK_VARIANTS_BY_CODES = _.reduce(WEEKLY_SCHEDULES, (curr, next) => {
  const { code, variant } = next;
  const currentVariants = curr[code] || [];
  currentVariants.push(variant);
  return { ...curr, [code]: _.uniq(currentVariants) };
}, {});

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

const WORKOUT_LEVELS = ['beginner', 'intermediate'];

export default {
  DAILY_SCHEDULES,
  WEEKDAYS,
  WEEKLY_CODES,
  WEEKLY_SCHEDULES,
  WEEK_VARIANTS_BY_CODES,
  WORKOUT_LEVELS,
};
