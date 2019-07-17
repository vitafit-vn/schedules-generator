function setupFixtures() {
  $('#user-id').val('KH0001');
  $('#full-name').val('Chị Bảo');
  $('#birth-year').val('1997');
  $('#height').val('154');
  $('#weight').val('54');
  $('#workout-level').val('beginner');
  $('#weekly-code').val('WS03');
  $('#week-variant').val('first_half');
  $('#week-period').val('2019-W29');
}

function setupPersonalizedTable() {
  $('#personalized-data tbody').empty();

  const weeklyCode = $('#weekly-code').val();
  const weekVariant = $('#week-variant').val();
  const workoutLevel = $('#workout-level').val();

  if (_.isEmpty(weeklyCode) || _.isEmpty(weekVariant) || _.isEmpty(workoutLevel)) return;

  const weeklyData = _.find(VSG.CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;

  const exerciseCodes = _.flatMap(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(
      VSG.CONSTANTS.DAILY_SCHEDULES[workoutLevel],
      ({ code }) => _.includes(codes, code),
    );

    return _.flatMap(dayExercises, ({ exercises }) => _.map(exercises, 'code'));
  });

  const rows = _.map(_.uniq(exerciseCodes), code => {
    const exercise = _.find(VSG.CONSTANTS.EXERCISES_DATABASE, { code });
    const { name } = exercise;
    return { code, name };
  });

  $('#personalized-data tbody').html(VSG.UTILS.renderPersonalizedRows(rows));
  $('#schedule-container').empty();
}

function setupWorkoutLevelSelect() {
  const workoutLevelOptions = _.map(
    VSG.CONSTANTS.WORKOUT_LEVELS,
    level => `<option value="${level}">${_.capitalize(level)}</option>`,
  );
  $('#workout-level').html(workoutLevelOptions);
  setupPersonalizedTable();
}

function setupWeeklyCodeSelect() {
  const weeklyCodeOptions = _.map(
    VSG.CONSTANTS.WEEKLY_CODES,
    code => `<option value="${code}">${code}</option>`,
  );
  $('#weekly-code').html(weeklyCodeOptions);
}

function setupWeekVariantSelect() {
  const weeklyCode = $('#weekly-code').val();
  const weekVariantOptions = _.map(
    VSG.CONSTANTS.WEEK_VARIANTS_BY_CODES[weeklyCode],
    variant => `<option value="${variant}">${variant}</option>`,
  );
  $('#week-variant').html(weekVariantOptions);
  setupPersonalizedTable();
}

$(document).ready(() => {
  setupWeeklyCodeSelect();
  setupWeekVariantSelect();
  setupWorkoutLevelSelect();

  setupFixtures();
  // setupPersonalizedTable();
});
