import _ from 'lodash';
import fp from 'lodash/fp';

// Constants
import { OFF_DAY } from '../../app/constants';

export function convertDailySchedulesRecords(records) {
  const dailySchedules = [];
  let currentRow;
  let currentExercises = [];

  _.each(records, row => {
    // New daily schedule
    if (!_.isEmpty(row[0])) {
      // Save current schedule
      if (!_.isEmpty(currentRow)) {
        const [dailyCode, muscles, variant] = currentRow;
        dailySchedules.push({ code: dailyCode, muscles, variant, exercises: currentExercises });
      }

      // Move to next schedule
      currentRow = row;
      currentExercises = [];
      return;
    }

    // Next exercise in current daily schedule
    const [code, name, sets, reps] = _.slice(row, 1);
    currentExercises.push({ code, name, sets, reps });
  });

  // Save last schedule
  if (!_.isEmpty(currentRow)) {
    const [dailyCode, muscles, variant] = currentRow;
    dailySchedules.push({ code: dailyCode, muscles, variant, exercises: currentExercises });
  }

  return dailySchedules;
}

export function convertExercisesDatabase(records) {
  return _.map(records, row => {
    const [code, name, muscle, difficulty, rawInstructions, videoUrl] = row;
    const instructionsParagraph = fp.flow(
      fp.trim,
      fp.split('\n'),
      fp.compact
    )(rawInstructions);

    const instructions = _.isEmpty(instructionsParagraph) ? undefined : instructionsParagraph;
    return { code, difficulty, instructions, muscle, name, videoUrl };
  });
}

export function convertWeeklySchedulesRecords(records) {
  return _.map(records, row => {
    const [code, frequency, shortkeys, description, ...rawDailyCodes] = row;

    const dailyCodes = _.map(rawDailyCodes, codes =>
      _.map(_.split(codes, '\n'), _.partial(_.replace, _, 'OFF', OFF_DAY))
    );

    return { code, dailyCodes, description, frequency, shortkeys };
  });
}
