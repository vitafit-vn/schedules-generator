function toggleLoading(loading) {
  if (!loading) {
    $('.loading-ring').addClass('hidden');
    return;
  }

  $('.loading-ring').removeClass('hidden');
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
  const rpe = $('#personalized-data input[name="bulk_rpe"]').val();
  $('#personalized-data input[name="rpe"]').val(rpe);
  
  const rest = $('#personalized-data input[name="bulk_rest"]').val();
  $('#personalized-data input[name="rest"]').val(rest);

  const recommendedWeight = $('#personalized-data input[name="bulk_recommended_weight"]').val();
  $('#personalized-data input[name="recommended_weight"]').val(recommendedWeight);
}

function getUserInfo() {
  const userId = $('#user-data input[name=user_id]').val();
  const name = $('#user-data input[name=full_name]').val();
  const birthYear = $('#user-data select[name=birth_year]').val();
  const height = $('#user-data input[name=height]').val();
  const weight = $('#user-data input[name=weight]').val();
  const weekPeriod = $('#user-data input[name=week_period]').val();

  const mandatories = [userId, name, birthYear, height, weight, weekPeriod];

  if (_.compact(mandatories).length < mandatories.length)
    throw new Error('Thiếu thông tin của khách hàng!');

  return {
    height,
    name,
    userId,
    weekPeriod,
    weight,
    age: new Date().getFullYear() - parseInt(birthYear),
  };
}

function getPersonalizedData() {
  const codes = _.map($('#personalized-data tbody th[scope="row"]').toArray(), 'dataset.code');
  const rpes = _.map($('#personalized-data tbody input[name="rpe"]').toArray(), 'value');
  const rests = _.map($('#personalized-data tbody input[name="rest"]').toArray(), 'value');
  const recommendedWeights =
    _.map($('#personalized-data tbody input[name="recommended_weight"]').toArray(), 'value');

  const rows = _.zip(codes, rpes, rests, recommendedWeights);

  return _.map(rows, ([code, rpe, rest, recommendedWeight]) => ({
    code, rpe, rest, recommendedWeight,
  }));
}

function generateScheduleFromInputs() {
  const userInfo = getUserInfo();
  const personalizedData = getPersonalizedData();
  const workoutLevel = $('#user-data select[name=workout_level]').val();
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekVariant = $('#user-data select[name=week_variant]').val();

  const { weekPeriod, userId } = userInfo;
  const checksum = VSG.UTILS.computeChecksum(userId, weekPeriod, weeklyCode, weekVariant, workoutLevel);

  const schedule = VSG.UTILS.renderWeeklySchedule({
    personalizedData, userInfo, weeklyCode, weekVariant, workoutLevel,
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
