function setupWeeklyCodeSelect() {
  const weeklyCodeOptions = _.map(
    window.VSG.WEEKLY_CODES,
    code => `<option value="${code}">${code}</option>`,
  );
  $('#user-data select[name=weekly_code]').html(weeklyCodeOptions);
}

function setupWeekNumberSelect() {
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekNumberOptions = _.map(window.VSG.WEEK_NUMBERS_BY_CODE[weeklyCode], weekNumber => {
    const title = _.capitalize(weekNumber)
      .split('_')
      .join(' ');
    return `<option value="${weekNumber}">${title}</option>`;
  });
  $('#user-data select[name=week_number]').html(weekNumberOptions);
}

function setupWorkoutLevelSelect() {
  const workoutLevelOptions = _.map(
    window.VSG.WORKOUT_LEVELS,
    level => `<option value="${level}">${_.capitalize(level)}</option>`,
  );
  $('#user-data select[name=workout_level]').html(workoutLevelOptions);
}

$(document).ready(() => {
  setupWeeklyCodeSelect();
  setupWeekNumberSelect();
  setupWorkoutLevelSelect();
});
