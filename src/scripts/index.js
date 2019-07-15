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

function generateScheduleFromInputs() {
  const userId = $('#user-data input[name=user_id]').val();
  const name = $('#user-data input[name=full_name]').val();
  const height = $('#user-data input[name=height]').val();
  const weight = $('#user-data input[name=weight]').val();

  if (_.isEmpty(userId) || _.isEmpty(name) || _.isEmpty(height) || _.isEmpty(weight))
    throw new Error('Thiếu thông tin của khách hàng!');

  const userInfo = {
    userId,
    name,
    height,
    weight,
  };
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekNumber = $('#user-data select[name=week_number]').val();
  const weeklyData = _.find(VSG.CONSTANTS.WEEKLY_SCHEDULES, { code: weeklyCode });
  const schedule = VSG.UTILS.renderWeeklySchedule(weeklyData, weekNumber, userInfo);

  const checksum = VSG.UTILS.computeChecksum(userId, height, weight);
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
