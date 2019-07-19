import _ from 'lodash';
import fp from 'lodash/fp';

function extractScheduleCodeAndName(schedule) {
  const [code, muscles] = schedule.split(/\s*[()]/);
  return { code, muscles };
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
        dailySchedules.push({
          ...extractScheduleCodeAndName(currentSchedule),
          exercises: currentExercises,
        });
      }

      // Move to next schedule
      currentSchedule = scheduleName;
      currentExercises = [];
      return;
    }

    // Next exercise in current daily schedule
    const [, code, name, sets, reps, rpe, rest] = row;
    const exercise = {
      code, name, reps, rest, rpe, sets,
    };

    currentExercises.push(exercise);
  });

  // Save last schedule
  if (!_.isEmpty(currentSchedule)) {
    dailySchedules.push({
      ...extractScheduleCodeAndName(currentSchedule),
      exercises: currentExercises,
    });
  }

  return dailySchedules;
}

export function convertExercisesDatabase(records) {
  return _.map(records, row => {
    const [code, name, muscle, difficulty, instructions, videoUrl] = row;
    const convertedInstructions = fp.flow(
      fp.trim,
      fp.split('\n'),
    )(instructions);

    return {
      code,
      difficulty,
      muscle,
      name,
      videoUrl,
      instructions: _.isEmpty(convertedInstructions) ? undefined : instructions,
    };
  });
}

export function convertWeeklySchedulesRecords(records) {
  return _.map(records, row => {
    const [code, frequency, description, shortkeys, variant, ...rawDailyCodes] = row;

    const dailyCodes = _.map(rawDailyCodes, codes => _.map(_.split(codes, '\n'), _.partial(_.replace, _, 'OFF', 'NGHỈ')));

    return {
      code, dailyCodes, description, frequency, shortkeys, variant,
    };
  });
}
