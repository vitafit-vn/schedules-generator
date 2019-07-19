function asyncLoadPartial(elementId, partialUrl) {
  return new Promise((resolve, reject) => {
    $(elementId).load(partialUrl, (data, status, configs) => {
      if (status === 'success') resolve(data);
      else reject(new Error(configs.statusText));
    });
  });
}

async function loadPartials() {
  await asyncLoadPartial('#user-info', '/partials/_user_info.html');
  await asyncLoadPartial('#personalized-table', '/partials/_personalized_table.html');
}

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
  $('#personalized-table tbody').empty();

  const weeklyCode = $('#weekly-code').val();
  const weekVariant = $('#week-variant').val();
  const workoutLevel = $('#workout-level').val();

  if (_.isEmpty(weeklyCode) || _.isEmpty(weekVariant) || _.isEmpty(workoutLevel)) return;

  const weeklyData = _.find(VSG.CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
  const { dailyCodes } = weeklyData;

  const exerciseCodes = _.flatMap(dailyCodes, (codes, index) => {
    const dayExercises = _.filter(
      _.union(VSG.CONSTANTS.DAILY_SCHEDULES[workoutLevel], VSG.CONSTANTS.DAILY_SCHEDULES.shared),
      ({ code }) => _.includes(codes, code),
    );

    return _.flatMap(dayExercises, ({ exercises }) => _.map(exercises, 'code'));
  });

  const rows = _.map(_.uniq(exerciseCodes), code => {
    const exercise = _.find(VSG.CONSTANTS.EXERCISES_DATABASE, { code });
    const { name } = exercise;
    return { code, name };
  });

  $('#personalized-table tbody').html(VSG.UTILS.renderPersonalizedRows(rows));
  $('#schedules-container').empty();
}

function setupWorkoutLevelSelect() {
  const workoutLevelOptions = _.map(
    VSG.CONSTANTS.WORKOUT_LEVELS,
    level => `<option value="${level}">${_.capitalize(level)}</option>`,
  );
  $('#workout-level').html(workoutLevelOptions);
  $('#workout-level').change(() => setupPersonalizedTable());
}

function setupWeeklyCodeSelect() {
  const weeklyCodeOptions = _.map(
    VSG.CONSTANTS.WEEKLY_CODES,
    ({ code, description, frequency }) =>
      `<option title="${description}" value="${code}">${code} (${frequency})</option>`,
  );
  $('#weekly-code').html(weeklyCodeOptions);
  $('#weekly-code').change(() => {
    setupWeekVariantSelect();
    setupPersonalizedTable();
  })
}

function setupWeekVariantSelect() {
  const weeklyCode = $('#weekly-code').val();
  const weekVariantOptions = _.map(
    VSG.CONSTANTS.WEEK_VARIANTS_BY_CODES[weeklyCode],
    variant => `<option value="${variant}">${variant}</option>`,
  );
  $('#week-variant').html(weekVariantOptions);
  $('#week-variant').change(() => setupPersonalizedTable());
}

function clearPersonalizedData(exerciseCode) {
  // Clear all
  if (_.isEmpty(exerciseCode)) {
    $('#personalized-table input').val('');
    return;
  }

  $(`#personalized-table tr[data-code=${exerciseCode}] input`).val('');
}

function clonePersonalizedData() {
  const rpe = $('#personalized-table input[name=bulk_rpe]').val();
  $('#personalized-table input[name=rpe]').val(rpe);

  const rest = $('#personalized-table input[name=bulk_rest]').val();
  $('#personalized-table input[name=rest]').val(rest);

  const recommendedWeight = $('#personalized-table input[name=bulk_recommended_weight]').val();
  $('#personalized-table input[name=recommended_weight]').val(recommendedWeight);
}

function setupOthers() {
  $('#clear-personalized-data').click(() => clearPersonalizedData());
  $('#clone-personalized-data').click(() => clonePersonalizedData());

  $('#schedules-form').submit(event => {
    // event.preventDefault();
    showSchedules();
  });
  $('#download-schedules').click(() => downloadSchedules());
}

function populateDataFromUrl() {
  const url = new URL(window.location.href);
  const params = Qs.parse(url.search.replace(/^\?/, ''));

  // selects or single inputs
  _.each(params, (value, key) => {
    if (_.isArray(value)) return;
    $(`#schedules-form *[name=${key}]`).val(value);
  });

  setupPersonalizedTable();

  // Personalized table inputs
  _.each(params, (value, key) => {
    if (!_.isArray(value)) return;
    $(`#personalized-table input[name=${key}]`).val(idx => value[idx]);
  });
}

$(document).ready(async () => {
  try {
    await loadPartials();
    
    setupWeeklyCodeSelect();
    setupWeekVariantSelect();
    setupWorkoutLevelSelect();
    setupOthers();
    populateDataFromUrl();
    
    // setupFixtures();
  } catch (error) {
    console.warn(error);
  }
});
