import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

// Locals
import CONSTANTS from './constants';
import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('html_head', Handlebars.templates.html_head);
  Handlebars.registerPartial('weekly_day_schedules', Handlebars.templates.weekly_day_schedules);
  Handlebars.registerPartial('weekly_header', Handlebars.templates.weekly_header);
  Handlebars.registerPartial('weekly_table', Handlebars.templates.weekly_table);
}

registerPartials();

const SITE_CONFIGS = {
  pageTitle: process.env.PAGE_TITLE,
  publicPath: process.env.PUBLIC_PATH,
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

function buildDayExercises(dayExercises, personalizedData, index) {
  const weekday = CONSTANTS.WEEKDAYS[index];

  // Off day
  if (_.isEmpty(dayExercises)) {
    return { title: `${weekday}: ${CONSTANTS.OFF_DAY}` };
  }

  const { code, muscles } = dayExercises[0];
  const flattenExercises = _.flatMap(dayExercises, 'exercises');

  return {
    exercises: _.map(
      flattenExercises,
      (configs, idx) => buildExerciseData(configs, personalizedData, idx),
    ),
    title: `${weekday}: ${code} (${muscles})`,
  };
}

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule({
  personalizedData, userInfo, weeklyCode, weekVariant, workoutLevel,
}) {
  const weeklyData = _.find(CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;
  const daySchedules = _.map(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(
      CONSTANTS.DAILY_SCHEDULES[workoutLevel],
      ({ code }) => _.includes(codes, code),
    );

    return buildDayExercises(dayExercises, personalizedData, index);
  });

  window.RENDERING_PARAMS = {
    daySchedules,
    personalizedData,
    userInfo,
    dailyCodes,
    site: SITE_CONFIGS,
    weekdays: CONSTANTS.WEEKDAYS,
  };

  return Handlebars.templates.weekly_schedule({
    daySchedules, userInfo, dailyCodes, site: SITE_CONFIGS, weekdays: CONSTANTS.WEEKDAYS,
  });
}
