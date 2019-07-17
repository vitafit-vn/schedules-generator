function toggleLoading(loading) {
  if (!loading) {
    $('.loading-ring').addClass('invisible');
    return;
  }

  $('.loading-ring').removeClass('invisible');
  $('#schedule-container').empty();
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

function bulkInputPersonalizedData() {
  const rpe = $('#personalized-data input[name=bulk-rpe]').val();
  $('#personalized-data input[name=rpe]').val(rpe);
  
  const rest = $('#personalized-data input[name=bulk-rest]').val();
  $('#personalized-data input[name=rest]').val(rest);

  const recommendedWeight = $('#personalized-data input[name=bulk-recommended-weight]').val();
  $('#personalized-data input[name=recommended-weight]').val(recommendedWeight);
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
  const codes = _.map($('#personalized-data th[scope=row]').toArray(), 'dataset.code');
  const rpes = _.map($('#personalized-data input[name=rpe]').toArray(), 'value');
  const rests = _.map($('#personalized-data input[name=rest]').toArray(), 'value');
  const recommendedWeights = _.map($('#personalized-data input[name=recommended-weight]').toArray(), 'value');

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
  const weekStart = $('#week-period')[0].valueAsDate;

  const { weekPeriod, userId } = userInfo;
  const checksum = VSG.UTILS.computeChecksum(userId, workoutLevel, weeklyCode, weekVariant, weekStart);

  const schedule = VSG.UTILS.renderWeeklySchedule({
    personalizedData, userInfo, weekStart, weeklyCode, weekVariant, workoutLevel,
  });

  return { checksum, schedule, userId };
}

async function onDownloadSchedules() {
  const { checksum, schedule, userId } = await generateScheduleFromInputs();

  const scheduleBlob = new Blob([schedule], { type: 'text/html;charset=utf-8' });
  const anchor = document.createElement('a', { id: 'schedules-downloader' });
  anchor.href = URL.createObjectURL(scheduleBlob);
  anchor.download = `${userId}_${checksum.substring(checksum.length - 6)}.html`;
  anchor.click();
}

async function onShowSchedules() {
  const { checksum, schedule, userId } = await generateScheduleFromInputs();
  $('#schedules-wrapper').html(schedule);
}

function downloadSchedules() {
  performAsyncTask(onDownloadSchedules);
}

function showSchedules() {
  performAsyncTask(onShowSchedules);
}
