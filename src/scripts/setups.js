function setupFixtures() {
  $('#user-data input[name=user_id]').val('KH0001');
  $('#user-data input[name=full_name]').val('Chị Bảo');
  $('#user-data select[name=birth_year]').val('1997');
  $('#user-data input[name=height]').val('154');
  $('#user-data input[name=weight]').val('54');
  $('#user-data select[name=workout_level]').val('beginner');
  $('#user-data select[name=weekly_code]').val('WS03');
  $('#user-data select[name=week_variant]').val('first_half');
  $('#user-data input[name=period_from]').val('2019-07-15');
  $('#user-data input[name=period_to]').val('2019-07-21');
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

function setupWeekVariantSelect() {
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekVariantOptions = _.map(
    VSG.CONSTANTS.WEEK_VARIANTS_BY_CODES[weeklyCode],
    variant => `<option value="${variant}">${variant}</option>`,
  );
  $('#user-data select[name=week_variant]').html(weekVariantOptions);
}

$(document).ready(() => {
  setupBirthYearSelect();
  setupWeeklyCodeSelect();
  setupWeekVariantSelect();
  setupWorkoutLevelSelect();

  setupFixtures();
});
