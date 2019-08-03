import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

// Locals
import { DAILY_SCHEDULES, EXERCISES_DATABASE, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES } from '../constants';
import './templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('daily_exercises', Handlebars.templates.daily_exercises);
  Handlebars.registerPartial('daily_schedule', Handlebars.templates.daily_schedule);
  Handlebars.registerPartial('html_head', Handlebars.templates.html_head);
  Handlebars.registerPartial('schedules_header', Handlebars.templates.schedules_header);
  Handlebars.registerPartial('weekly_day_schedules', Handlebars.templates.weekly_day_schedules);
  Handlebars.registerPartial('weekly_table', Handlebars.templates.weekly_table);
}

registerPartials();

function buildExerciseData({ configs, index, personalizedData }) {
  const { code } = configs;

  const { difficulty, instructions, muscle, name, imageUrl, videoUrl } = _.find(EXERCISES_DATABASE, { code });
  const { rpe, recommendedWeight, rest } = personalizedData;

  return {
    ...configs,
    difficulty,
    instructions,
    muscle,
    name,
    videoUrl,
    imageUrl: _.isEmpty(imageUrl) ? undefined : process.env.publicPath + imageUrl,
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

  return {
    exercises: _.map(flattenExercises, (configs, idx) => buildExerciseData({ configs, personalizedData, index: idx })),
    title: `${formattedDate}: ${code} (${muscles})`,
  };
}

export function renderDailySchedule({ customerInfo, dayIndex, personalizedData }) {
  const { weekStart, weeklyCode, workoutLevel, ...userInfo } = customerInfo;
  const { dailyCodes } = _.find(WEEKLY_SCHEDULES, { code: weeklyCode });
  const codes = dailyCodes[dayIndex];
  const date = weekStart.plus({ days: dayIndex });

  const allSchedules = _.union(DAILY_SCHEDULES[workoutLevel], DAILY_SCHEDULES.shared);
  const dayExercises = _.filter(allSchedules, ({ code }) => _.includes(codes, code));

  if (_.isEmpty(dayExercises)) return '';

  const dailyExercises = buildDayExercises({ date, dayExercises, dayIndex, personalizedData });

  const params = {
    dailyExercises,
    userInfo,
    site: {
      pageTitle: 'VitaFit VN - Chế độ tập luyện hàng ngày',
      publicPath: process.env.PUBLIC_PATH,
    },
    subTitle: `Ngày ${date.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng ngày',
  };

  return Handlebars.templates.daily_schedule(params);
}

export function renderWeeklySchedule({ customerInfo, personalizedData }) {
  const { weekStart, weeklyCode, workoutLevel, ...userInfo } = customerInfo;
  const { dailyCodes } = _.find(WEEKLY_SCHEDULES, { code: weeklyCode });

  const datesInWeek = _.map(_.range(WEEKDAYS.length), days => weekStart.plus({ days }));
  const weekEnd = _.last(datesInWeek);

  const daySchedules = _.map(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(_.union(DAILY_SCHEDULES[workoutLevel], DAILY_SCHEDULES.shared), ({ code }) =>
      _.includes(codes, code)
    );

    return buildDayExercises({ dayExercises, personalizedData, date: datesInWeek[index], dayIndex: index });
  });

  const params = {
    dailyCodes,
    daySchedules,
    userInfo,
    site: {
      pageTitle: 'VitaFit VN - Chế độ tập luyện hàng tuần',
      publicPath: process.env.PUBLIC_PATH,
    },
    subTitle: `Tuần từ ${weekStart.toFormat('dd/MM/yyyy')} đến ${weekEnd.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng tuần',
    weekdays: WEEKDAYS,
  };

  return Handlebars.templates.weekly_schedule(params);
}
