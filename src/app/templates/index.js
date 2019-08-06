import _ from 'lodash';
import fp from 'lodash/fp';
import renderToString from 'preact-render-to-string';

// Constants
import { DAILY_SCHEDULES, EXERCISES_DATABASE, FORMATS, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES } from 'app/constants';

// Utils
import { convertBirthYearToAge, computeChecksum, convertWeekPeriod } from 'app/utils';

// Locals
import DailySchedule from './DailySchedule';
import LT16Report from './LT16Report';
import WeeklySchedule from './WeeklySchedule';

function findDayExercise({ dailyCode, workoutLevel, workoutVariant }) {
  return _.find(
    DAILY_SCHEDULES,
    ({ code, level, variant }) =>
      (level === workoutLevel || level === 'all') &&
      (variant === workoutVariant || variant === 'all') &&
      code === dailyCode
  );
}

function buildExerciseData({ configs, index, personalizedData }) {
  const { code } = configs;

  const { difficulty, instructions, muscle, name, imageUrl, videoUrl } = _.find(EXERCISES_DATABASE, { code });
  const { rpe, recommendedWeight, rest } = personalizedData;

  return {
    ...configs,
    difficulty,
    imageUrl,
    instructions,
    muscle,
    name,
    videoUrl,
    order: index + 1,
    recommendedWeight: recommendedWeight[code],
    rest: rest[code],
    rpe: rpe[code],
  };
}

function buildDayExercises({ date, dayExercises, dayIndex, personalizedData }) {
  const weekday = WEEKDAYS[dayIndex];
  const formattedDate = `${weekday}, ngày ${date.toFormat('dd/MM')}`;

  // Off day
  if (_.isEmpty(dayExercises)) return { title: `${formattedDate}: ${OFF_DAY}` };

  const { code, muscles } = dayExercises[0];
  const flattenExercises = _.flatMap(dayExercises, 'exercises');

  const exercises = _.map(flattenExercises, (configs, idx) =>
    buildExerciseData({ configs, personalizedData, index: idx })
  );

  return {
    exercises,
    title: `${formattedDate}: ${code} (${muscles})`,
  };
}

function renderDailySchedule({ customerInfo, dayIndex, personalizedData }) {
  const { weekStart, weeklyCode, workoutLevel, workoutVariant, ...userInfo } = customerInfo;
  const { dailyCodes } = _.find(WEEKLY_SCHEDULES, { code: weeklyCode });
  const codes = dailyCodes[dayIndex];
  const date = weekStart.plus({ days: dayIndex });

  const dayExercises = fp.flow(
    fp.map(dailyCode => findDayExercise({ dailyCode, workoutLevel, workoutVariant })),
    fp.compact
  )(codes);

  // Off day
  if (_.isEmpty(dayExercises)) return undefined;

  const dailyExercises = buildDayExercises({ date, dayExercises, dayIndex, personalizedData });
  const subTitle = `Ngày ${date.toFormat(FORMATS.DISPLAY_DATE)}`;

  const renderingProps = {
    dailyExercises,
    subTitle,
    userInfo,
    pageTitle: 'VitaFit VN - Chế độ tập luyện hàng ngày',
    title: 'Chế độ tập luyện hàng ngày',
  };

  const jsxElement = <DailySchedule {...renderingProps} />;

  return {
    jsxElement,
    fileName: `daily-${date.toFormat(FORMATS.URI_PATH_DATE)}`,
    name: subTitle,
    toHtml: () => renderToString(jsxElement),
  };
}

function renderWeeklySchedule({ customerInfo, personalizedData }) {
  const { weekStart, weeklyCode, workoutLevel, workoutVariant, ...userInfo } = customerInfo;
  const { dailyCodes } = _.find(WEEKLY_SCHEDULES, { code: weeklyCode });

  const datesInWeek = _.map(_.range(WEEKDAYS.length), days => weekStart.plus({ days }));
  const weekEnd = _.last(datesInWeek);

  const daySchedules = _.map(dailyCodes, (codes, index) => {
    const dayExercises = fp.flow(
      fp.map(dailyCode => findDayExercise({ dailyCode, workoutLevel, workoutVariant })),
      fp.compact
    )(codes);

    return buildDayExercises({ dayExercises, personalizedData, date: datesInWeek[index], dayIndex: index });
  });

  const subTitle = `Tuần từ ${weekStart.toFormat(FORMATS.DISPLAY_DATE)} đến ${weekEnd.toFormat(FORMATS.DISPLAY_DATE)}`;

  const renderingProps = {
    dailyCodes,
    daySchedules,
    subTitle,
    userInfo,
    pageTitle: 'VitaFit VN - Chế độ tập luyện hàng tuần',
    title: 'Chế độ tập luyện hàng tuần',
    weekdays: WEEKDAYS,
  };

  const jsxElement = <WeeklySchedule {...renderingProps} />;

  return {
    jsxElement,
    fileName: `weekly-${weekStart.toFormat(FORMATS.URI_PATH_DATE)}_${weekEnd.toFormat(FORMATS.URI_PATH_DATE)}`,
    name: subTitle,
    toHtml: () => renderToString(jsxElement),
  };
}

export function renderAllSchedules({ customerInfo: originalInfo, personalizedData }) {
  const { birthYear, customerId, weeklyCode, weekPeriod, workoutLevel, ...restInfo } = originalInfo;

  const checksum = computeChecksum(customerId, workoutLevel, weeklyCode, weekPeriod);

  const customerInfo = {
    ...restInfo,
    customerId,
    weeklyCode,
    workoutLevel,
    age: convertBirthYearToAge(birthYear),
    weekStart: convertWeekPeriod(weekPeriod),
  };

  const dailySchedules = _.map(WEEKDAYS, (weekday, dayIndex) =>
    renderDailySchedule({ customerInfo, dayIndex, personalizedData })
  );
  const weeklySchedule = renderWeeklySchedule({ customerInfo, personalizedData });
  const allSchedules = [weeklySchedule, ..._.compact(dailySchedules)];

  return { allSchedules, checksum };
}

export function renderLT16Report({ customerInfo }) {
  const { birthYear, ...restInfo } = customerInfo;

  const userInfo = {
    ...restInfo,
    age: convertBirthYearToAge(birthYear),
  };

  const renderingProps = {
    userInfo,
    pageTitle: 'VitaFit VN - Lộ trình Dinh dưỡng & Luyện tập thay đổi sức khoẻ & vóc dáng sau 16 tuần',
    title: 'Lộ trình Dinh dưỡng & Luyện tập thay đổi sức khoẻ & vóc dáng sau 16 tuần',
  };

  const jsxElement = <LT16Report {...renderingProps} />;

  return {
    jsxElement,
    name: 'lt16',
    toHtml: () => renderToString(jsxElement),
  };
}
