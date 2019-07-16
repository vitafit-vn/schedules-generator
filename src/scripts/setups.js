function setupFixtures() {
  $('#user-info input[name=user_id]').val('KH0001');
  $('#user-info input[name=full_name]').val('Chị Bảo');
  $('#user-info input[name=birth_year]').val('1997');
  $('#user-info input[name=height]').val('154');
  $('#user-info input[name=weight]').val('54');
  $('#user-info select[name=workout_level]').val('beginner');
  $('#user-info select[name=weekly_code]').val('WS03');
  $('#user-info select[name=week_variant]').val('first_half');
  $('#user-info input[name=week_period]').val('2019-W29');
}

function setupPersonalizedTable() {
  const weeklyCode = $('#user-info select[name=weekly_code]').val();
  const weekVariant = $('#user-info select[name=week_variant]').val();
  const workoutLevel = $('#user-info select[name=workout_level]').val();

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
    return `
      <tr>
        <th data-code="${code}" scope="row">${code}</th>
        <td>${name}</td>
        <td><input type="text" name="rpe" /></td>
        <td><input type="text" name="rest" /><span>s</span></td>
        <td><input type="text" name="recommended_weight" /><span>kg</span></td>
      </tr>
    `;
  });

  $('#personalized-data table tbody').html(_.join(rows, '\n'));
}

function setupWorkoutLevelSelect() {
  setupPersonalizedTable();

  const workoutLevelOptions = _.map(
    VSG.CONSTANTS.WORKOUT_LEVELS,
    level => `<option value="${level}">${_.capitalize(level)}</option>`,
  );
  $('#user-info select[name=workout_level]').html(workoutLevelOptions);
}

function setupWeeklyCodeSelect() {
  const weeklyCodeOptions = _.map(
    VSG.CONSTANTS.WEEKLY_CODES,
    code => `<option value="${code}">${code}</option>`,
  );
  $('#user-info select[name=weekly_code]').html(weeklyCodeOptions);
}

function setupWeekVariantSelect() {
  setupPersonalizedTable();

  const weeklyCode = $('#user-info select[name=weekly_code]').val();
  const weekVariantOptions = _.map(
    VSG.CONSTANTS.WEEK_VARIANTS_BY_CODES[weeklyCode],
    variant => `<option value="${variant}">${variant}</option>`,
  );
  $('#user-info select[name=week_variant]').html(weekVariantOptions);
}

$(document).ready(() => {
  setupWeeklyCodeSelect();
  setupWeekVariantSelect();
  setupWorkoutLevelSelect();

  setupFixtures();
  setupPersonalizedTable();
});
