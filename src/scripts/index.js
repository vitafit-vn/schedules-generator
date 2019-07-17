function toggleLoading(loading) {
  if (!loading) {
    $('#loading-spinner').addClass('d-none');
    return;
  }

  $('#loading-spinner').removeClass('d-none');
  $('#schedules-container').empty();
}

async function performAsyncTask(callback) {
  try {
    toggleLoading(true);
    await callback();
    toggleLoading(false);
  } catch (error) {
    toggleLoading(false);
    console.warn(error);
    alert(error.message);
  }
}

function getUserInfo() {
  const userId = $('#user-id').val();
  const name = $('#full-name').val();
  const birthYear = $('#birth-year').val();
  const height = $('#height').val();
  const weight = $('#weight').val();

  return {
    height,
    name,
    userId,
    weight,
    age: new Date().getFullYear() - parseInt(birthYear),
  };
}

function getPersonalizedData() {
  const codes = _.map($('#personalized-table th[scope=row]').toArray(), 'dataset.code');
  const rpes = _.map($('#personalized-table input[name=rpe]').toArray(), 'value');
  const rests = _.map($('#personalized-table input[name=rest]').toArray(), 'value');
  const recommendedWeights = _.map($('#personalized-table input[name=recommended-weight]').toArray(), 'value');

  const rows = _.zip(codes, rpes, rests, recommendedWeights);

  return _.map(rows, ([code, rpe, rest, recommendedWeight]) => ({
    code, rpe, rest, recommendedWeight,
  }));
}

function generateScheduleFromInputs() {
  const userInfo = getUserInfo();
  const personalizedData = getPersonalizedData();
  const workoutLevel = $('#workout-level').val();
  const weeklyCode = $('#weekly-code').val();
  const weekVariant = $('#week-variant').val();
  const weekPeriod = $('#week-period')[0].valueAsDate;

  const { userId } = userInfo;
  const checksum = VSG.UTILS.computeChecksum(userId, workoutLevel, weeklyCode, weekVariant, weekPeriod);
  const renderingParams = {
    personalizedData, userInfo, weekPeriod, weekVariant, weeklyCode, workoutLevel,
  };

  const dailySchedules = _.map(
    _.range(VSG.CONSTANTS.WEEKDAYS.length),
    dayIndex => VSG.UTILS.renderDailySchedule({ ...renderingParams, dayIndex }),
  );

  const weeklySchedule = VSG.UTILS.renderWeeklySchedule(renderingParams);

  return { checksum, dailySchedules, userId, weeklySchedule };
}

async function onDownloadSchedules() {
  const { checksum, userId, weeklySchedule } = await generateScheduleFromInputs();

  const scheduleBlob = new Blob([weeklySchedule], { type: 'text/html;charset=utf-8' });
  const anchor = document.createElement('a', { id: 'schedules-downloader' });
  anchor.href = URL.createObjectURL(scheduleBlob);
  anchor.download = `${userId}_${checksum.substring(checksum.length - 6)}.html`;
  anchor.click();
}

async function onShowSchedules() {
  const { checksum, dailySchedules, weeklySchedule, userId } = await generateScheduleFromInputs();
  $('#schedules-wrapper').html(_.join([weeklySchedule, ...dailySchedules], '\n'));
}

function downloadSchedules() {
  performAsyncTask(onDownloadSchedules);
}

function showSchedules() {
  performAsyncTask(onShowSchedules);
}
