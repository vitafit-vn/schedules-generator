// Data
import DAILY_SCHEDULES from './data/daily_schedules.json';
import EXERCISES_DATABASE from './data/exercises_database.json';
import WEEKLY_SCHEDULES from './data/weekly_schedules.json';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const ACTIVITY_RATES = [
  { description: 'Ít hoạt động, chỉ ăn, đi làm, về ngủ', value: 1.2 },
  { description: 'Có tập nhẹ nhàng, tuần 1 - 3 buổi', value: 1.375 },
  { description: 'Có vận động vừa, tuần 4 - 5 buổi', value: 1.55 },
  { description: 'Vận động nhiều, tuần 6 - 7 buổi', value: 1.725 },
  { description: 'Vận động rất nhiều, ngày 2 lần', value: 1.9 },
];

const FORMATS = {
  DISPLAY_DATE: 'dd/MM/yyyy',
  URI_PATH_DATE: 'dd-MM-yyyy',
};

const GENDERS_MAPPING = { FEMALE: 'female', MALE: 'male' };

const GENDERS = [{ code: GENDERS_MAPPING.MALE, name: 'Nam' }, { code: GENDERS_MAPPING.FEMALE, name: 'Nữ' }];

const HOME_PAGE = 'http://www.vitafit.vn';

const OFF_DAY = 'NGHỈ';

const TARGETS_MAPPING = { DECREASE: 'decrease', INCREASE: 'increase' };

const TARGETS = [
  { code: 'decrease', description: 'Giảm cân, giảm mỡ' },
  { code: 'increase', description: 'Tăng cân, tăng cơ' },
];

const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

const WORKOUT_LEVELS = [
  { code: 'beginner', description: 'Beginner' },
  { code: 'intermediate', description: 'Intermediate' },
];

const WORKOUT_VARIANTS = [
  { code: 'full_gym', description: 'Tập tại phòng' },
  { code: 'home', description: 'Tập tại nhà' },
];

export {
  ACTIVITY_RATES,
  DAILY_SCHEDULES,
  EXERCISES_DATABASE,
  FORMATS,
  GENDERS,
  GENDERS_MAPPING,
  HOME_PAGE,
  IS_PRODUCTION,
  OFF_DAY,
  TARGETS,
  TARGETS_MAPPING,
  WEEKDAYS,
  WEEKLY_SCHEDULES,
  WORKOUT_LEVELS,
  WORKOUT_VARIANTS,
};
