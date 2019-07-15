function setupFixtures() {
  $('#user-data input[name=user_id]').val('KH0001');
  $('#user-data input[name=full_name]').val('Chị Bảo');
  $('#user-data select[name=birth_year]').val('1997');
  $('#user-data input[name=height]').val('154');
  $('#user-data input[name=weight]').val('54');
  $('#user-data select[name=workout_level]').val('beginner');
  $('#user-data select[name=weekly_code]').val('WS03');
  $('#user-data select[name=week_number]').val('week_1');
}

function setupBirthYearSelect() {
  const birthYearOptions = _.map(
    _.reverse(_.range(1950, 2005)),
    year => `<option value="${year}">${year}</option>`,
  );
  $('#user-data select[name=birth_year]').html(birthYearOptions);
}

function setupWorkoutLevelSelect() {
  const workoutLevelOptions = _.map(
    VSG.CONSTANTS.WORKOUT_LEVELS,
    level => `<option value="${level}">${_.capitalize(level)}</option>`,
  );
  $('#user-data select[name=workout_level]').html(workoutLevelOptions);
}

function setupWeeklyCodeSelect() {
  const weeklyCodeOptions = _.map(
    VSG.CONSTANTS.WEEKLY_CODES,
    code => `<option value="${code}">${code}</option>`,
  );
  $('#user-data select[name=weekly_code]').html(weeklyCodeOptions);
}

function setupWeekNumberSelect() {
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekNumberOptions = _.map(VSG.CONSTANTS.WEEK_NUMBERS_BY_CODE[weeklyCode], weekNumber => {
    const title = _.capitalize(weekNumber)
      .split('_')
      .join(' ');
    return `<option value="${weekNumber}">${title}</option>`;
  });
  $('#user-data select[name=week_number]').html(weekNumberOptions);
}

$(document).ready(() => {
  setupBirthYearSelect();
  setupWeeklyCodeSelect();
  setupWeekNumberSelect();
  setupWorkoutLevelSelect();

  setupFixtures();
});
