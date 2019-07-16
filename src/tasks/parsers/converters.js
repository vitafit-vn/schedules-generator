import _ from 'lodash';

// Locals
import { WEEKDAYS } from '../../app/constants';

function mapWeekDays(weekDays) {
  const titles = _.slice(WEEKDAYS, 0, weekDays.length);
  const pairs = _.zip(titles, weekDays);
  return _.map(pairs, ([title, exercises]) => ({ title, exercises }));
}

export function convertDailySchedulesRecords(records) {
  const dailySchedules = [];
  let currentSchedule;
  let currentExercises = [];

  _.each(records, row => {
    const scheduleName = row[0];

    // New daily schedule
    if (!_.isEmpty(scheduleName)) {
      // Save current schedule
      if (!_.isEmpty(currentSchedule)) {
        const [code, muscles] = currentSchedule.split(/\s*[()]/);
        dailySchedules.push({ code, muscles, exercises: currentExercises });
      }

      // Move to next schedule
      currentSchedule = scheduleName;
      currentExercises = [];
      return;
    }

    // Next exercise in current daily schedule
    const [, code, name, muscle, difficulty, sets, reps] = row;
    const exercise = {
      code,
      difficulty,
      muscle,
      name,
      reps,
      sets,
    };

    currentExercises.push(exercise);
  });

  // Save last schedule
  if (!_.isEmpty(currentSchedule)) {
    dailySchedules.push({ name: currentSchedule, exercises: currentExercises });
  }

  return dailySchedules;
}

export function convertWeeklySchedulesRecords(records) {
  const schedulesMapping = {};

  _.each(records, row => {
    const [code, weekNumber, ...weekdays] = row;
    schedulesMapping[code] = schedulesMapping[code] || {};
    schedulesMapping[code][weekNumber] = mapWeekDays(weekdays);
  });

  const schedulesPairs = _.toPairs(schedulesMapping);

  return _.map(schedulesPairs, ([code, schedulesByWeek]) => {
    const weekPairs = _.toPairs(schedulesByWeek);
    const byWeeks = _.map(weekPairs, ([weekNumber, weekDays]) => ({ weekNumber, weekDays }));
    return { byWeeks, code };
  });
}
