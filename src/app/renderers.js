import _ from 'lodash';
import { DateTime } from 'luxon';
import Handlebars from 'handlebars/runtime';

// Locals
import CONSTANTS from './constants';
import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('daily_exercises', Handlebars.templates.daily_exercises);
  Handlebars.registerPartial('daily_schedule', Handlebars.templates.daily_schedule);
  Handlebars.registerPartial('html_head', Handlebars.templates.html_head);
  Handlebars.registerPartial('personalized_rows', Handlebars.templates.personalized_rows);
  Handlebars.registerPartial('schedules_header', Handlebars.templates.schedules_header);
  Handlebars.registerPartial('weekly_day_schedules', Handlebars.templates.weekly_day_schedules);
  Handlebars.registerPartial('weekly_table', Handlebars.templates.weekly_table);
}

registerPartials();

const SITE_CONFIGS = {
  pageTitle: process.env.PAGE_TITLE,
  publicPath: process.env.PUBLIC_PATH,
  vitafitHome: 'http://vitafit.vn',
};

function buildExerciseData(configs, personalizedData, index) {
  const { code } = configs;

  const {
    difficulty, instructions, muscle, name, imageUrl, videoUrl,
  } = _.find(CONSTANTS.EXERCISES_DATABASE, { code });

  const { rpe, recommendedWeight, rest } = _.find(personalizedData, { code }) || {};

  return {
    ...configs,
    difficulty,
    imageUrl: _.isEmpty(imageUrl) ? undefined : SITE_CONFIGS.publicPath + imageUrl,
    instructions,
    muscle,
    name,
    recommendedWeight,
    rest,
    rpe,
    videoUrl,
    order: index + 1,
  };
}

function buildDayExercises({
  date, dayExercises, dayIndex, personalizedData,
}) {
  const weekday = CONSTANTS.WEEKDAYS[dayIndex];
  const formattedDate = `${weekday}, ngày ${date.toFormat('dd/MM')}`;

  // Off day
  if (_.isEmpty(dayExercises)) return { title: `${formattedDate}: ${CONSTANTS.OFF_DAY}` };

  const { code, muscles } = dayExercises[0];
  const flattenExercises = _.flatMap(dayExercises, 'exercises');

  return {
    exercises: _.map(
      flattenExercises,
      (configs, idx) => buildExerciseData(configs, personalizedData, idx),
    ),
    title: `${formattedDate}: ${code} (${muscles})`,
  };
}

export function renderPersonalizedRows(rows) {
  return Handlebars.templates.personalized_rows({ rows });
}

export function renderDailySchedule({
  dayIndex, personalizedData, userInfo, weekPeriod, weekVariant, weeklyCode, workoutLevel,
}) {
  const weeklyData = _.find(CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;
  const codes = dailyCodes[dayIndex];
  const date = DateTime.fromJSDate(weekPeriod).plus({ days: dayIndex });

  const dayExercises = _.filter(
    _.union(CONSTANTS.DAILY_SCHEDULES[workoutLevel], CONSTANTS.DAILY_SCHEDULES.shared),
    ({ code }) => _.includes(codes, code),
  );

  if (_.isEmpty(dayExercises)) return '';

  const dailyExercises = buildDayExercises({
    date, dayExercises, dayIndex, personalizedData,
  });

  const params = {
    dailyExercises,
    userInfo,
    site: {
      ...SITE_CONFIGS,
      pageTitle: 'VitaFit VN - Chế độ tập luyện hàng ngày',
    },
    subTitle: `Ngày ${date.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng ngày',
  };

  window.DAILY_RENDERING_PARAMS = window.DAILY_RENDERING_PARAMS || [];
  window.DAILY_RENDERING_PARAMS[dayIndex] = params;

  return Handlebars.templates.daily_schedule(params);
}

export function renderWeeklySchedule({
  personalizedData, userInfo, weekPeriod, weekVariant, weeklyCode, workoutLevel,
}) {
  const weeklyData = _.find(CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;

  const weekStart = DateTime.fromJSDate(weekPeriod);
  const datesInWeek = _.map(_.range(CONSTANTS.WEEKDAYS.length), days => weekStart.plus({ days }));
  const weekEnd = _.last(datesInWeek);

  const daySchedules = _.map(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(
      _.union(CONSTANTS.DAILY_SCHEDULES[workoutLevel], CONSTANTS.DAILY_SCHEDULES.shared),
      ({ code }) => _.includes(codes, code),
    );

    return buildDayExercises({
      dayExercises, personalizedData, date: datesInWeek[index], dayIndex: index,
    });
  });

  const params = {
    dailyCodes,
    daySchedules,
    userInfo,
    site: {
      ...SITE_CONFIGS,
      pageTitle: 'VitaFit VN - Chế độ tập luyện hàng tuần',
    },
    subTitle: `Tuần từ ${weekStart.toFormat('dd/MM/yyyy')} đến ${weekEnd.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng tuần',
    weekdays: CONSTANTS.WEEKDAYS,
  };

  window.WEEKLY_RENDERING_PARAMS = params;
  return Handlebars.templates.weekly_schedule(params);
}
