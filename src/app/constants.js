// Data
import DAILY_SCHEDULES_BEGINNER from './data/daily_schedules_beginner.json';
import DAILY_SCHEDULES_INTERMEDIATE from './data/daily_schedules_intermediate.json';
import DAILY_SCHEDULES_SHARED from './data/daily_schedules_shared.json';
import EXERCISES_DATABASE from './data/exercises_database.json';
import WEEKLY_SCHEDULES from './data/weekly_schedules.json';

const DAILY_SCHEDULES = {
  beginner: DAILY_SCHEDULES_BEGINNER,
  intermediate: DAILY_SCHEDULES_INTERMEDIATE,
  shared: DAILY_SCHEDULES_SHARED,
};

const FORMATS = {
  DISPLAY_DATE: 'dd/MM/yyyy',
  URI_PATH_DATE: 'dd-MM-yyyy',
};

const HOME_PAGE = 'http://www.vitafit.vn';

const OFF_DAY = 'NGHỈ';

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

const WORKOUT_LEVELS = ['beginner', 'intermediate'];

export { DAILY_SCHEDULES, EXERCISES_DATABASE, FORMATS, HOME_PAGE, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES, WORKOUT_LEVELS };
