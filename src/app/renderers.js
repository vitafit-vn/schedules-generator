import _ from 'lodash';
import { DateTime } from 'luxon';
import Handlebars from 'handlebars/runtime';

// Locals
import CONSTANTS from './constants';
import './configs/templates.handlebars';

function registerPartials() {
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
    difficulty, muscle, name, videoUrl,
  } = _.find(CONSTANTS.EXERCISES_DATABASE, { code });

  const { rpe, recommendedWeight, rest } = _.find(personalizedData, { code }) || {};

  return {
    ...configs, difficulty, muscle, name, rpe, recommendedWeight, rest, videoUrl, order: index + 1,
  };
}

function buildDayExercises({
  dayExercises, index, personalizedData, weekStart,
}) {
  const weekday = CONSTANTS.WEEKDAYS[index];
  const date = weekStart.plus({ days: index });
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

export function renderWeeklySchedule({
  personalizedData, userInfo, weekPeriod, weekVariant, weeklyCode, workoutLevel,
}) {
  const weeklyData = _.find(CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;

  const weekStart = DateTime.fromJSDate(weekPeriod);
  const weekEnd = weekStart.plus({ days: 7 });

  const daySchedules = _.map(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(
      _.union(CONSTANTS.DAILY_SCHEDULES[workoutLevel], CONSTANTS.DAILY_SCHEDULES.shared),
      ({ code }) => _.includes(codes, code),
    );

    return buildDayExercises({
      dayExercises, index, personalizedData, weekStart,
    });
  });

  const params = {
    dailyCodes,
    daySchedules,
    userInfo,
    site: SITE_CONFIGS,
    subTitle: `Tuần từ ${weekStart.toFormat('dd/MM/yyyy')} đến ${weekEnd.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng tuần',
    weekdays: CONSTANTS.WEEKDAYS,
  };

  window.RENDERING_PARAMS = params;
  return Handlebars.templates.weekly_schedule(params);
}
