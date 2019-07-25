// import inlineCss from 'inline-css';
import _ from 'lodash';
import renderToString from 'preact-render-to-string';

// Constants
import { DAILY_SCHEDULES, EXERCISES_DATABASE, OFF_DAY, WEEKDAYS, WEEKLY_SCHEDULES } from 'app/constants';

// Utils
import { calculateAge, computeChecksum, convertWeekPeriod } from 'app/utils';

// Locals
import DailySchedule from './DailySchedule';
import WeeklySchedule from './WeeklySchedule';

function buildExerciseData(configs, personalizedData, index) {
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
    // imageUrl: _.isEmpty(imageUrl) ? undefined : SITE_CONFIGS.publicPath + imageUrl,
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
    exercises: _.map(flattenExercises, (configs, idx) => buildExerciseData(configs, personalizedData, idx)),
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

  const renderingProps = {
    dailyExercises,
    userInfo,
    pageTitle: 'VitaFit VN - Chế độ tập luyện hàng ngày',
    subTitle: `Ngày ${date.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng ngày',
  };

  return renderToString(<DailySchedule {...renderingProps} />);
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

  const renderingProps = {
    dailyCodes,
    daySchedules,
    userInfo,
    pageTitle: 'VitaFit VN - Chế độ tập luyện hàng tuần',
    subTitle: `Tuần từ ${weekStart.toFormat('dd/MM/yyyy')} đến ${weekEnd.toFormat('dd/MM/yyyy')}`,
    title: 'Chế độ tập luyện hàng tuần',
    weekdays: WEEKDAYS,
  };

  return renderToString(<WeeklySchedule {...renderingProps} />);
}

export function renderSchedulesHTML({ customerInfo: originalInfo, personalizedData }) {
  const { birthYear, customerId, weeklyCode, weekPeriod, workoutLevel, ...restInfo } = originalInfo;

  const checksum = computeChecksum(customerId, workoutLevel, weeklyCode, weekPeriod);

  const customerInfo = {
    ...restInfo,
    customerId,
    weeklyCode,
    workoutLevel,
    age: calculateAge(birthYear),
    weekStart: convertWeekPeriod(weekPeriod),
  };

  const dailySchedules = _.map(_.range(WEEKDAYS.length), dayIndex =>
    renderDailySchedule({ customerInfo, dayIndex, personalizedData })
  );
  const weeklySchedule = renderWeeklySchedule({ customerInfo, personalizedData });

  return { checksum, dailySchedules, weeklySchedule };
}
