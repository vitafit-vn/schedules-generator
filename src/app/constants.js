// Locals
import DAILY_SCHEDULES_BEGINNER from './configs/daily_schedules_beginner.json';
import DAILY_SCHEDULES_INTERMEDIATE from './configs/daily_schedules_intermediate.json';
import DAILY_SCHEDULES_SHARED from './configs/daily_schedules_shared.json';
import EXERCISES_DATABASE from './configs/exercises_database.json';
import WEEKLY_SCHEDULES from './configs/weekly_schedules.json';

const WORKOUT_LEVELS = ['beginner', 'intermediate'];

const DAILY_SCHEDULES = {
  beginner: DAILY_SCHEDULES_BEGINNER,
  intermediate: DAILY_SCHEDULES_INTERMEDIATE,
  shared: DAILY_SCHEDULES_SHARED,
};

const OFF_DAY = 'NGHỈ';

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

export { DAILY_SCHEDULES, EXERCISES_DATABASE, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES, WORKOUT_LEVELS };
