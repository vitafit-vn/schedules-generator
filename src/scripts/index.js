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
  const birthYear = $('#user-data select[name=birth_year]').val();
  const height = $('#user-data input[name=height]').val();
  const weight = $('#user-data input[name=weight]').val();
  const periodFrom = $('#user-data input[name=period_from]').val();
  const periodTo = $('#user-data input[name=period_to]').val();
  const workoutLevel = $('#user-data select[name=workout_level]').val();
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekVariant = $('#user-data select[name=week_variant]').val();

  const mandatories = [userId, name, birthYear, height, weight, periodFrom, periodTo];

  if (_.compact(mandatories).length < mandatories.length)
    throw new Error('Thiếu thông tin của khách hàng!');

  const userInfo = {
    height,
    name,
    userId,
    weight,
    age: new Date().getFullYear() - parseInt(birthYear),
    period: {
      from: periodFrom,
      to: periodTo,
    }
  };

  const checksum = VSG.UTILS.computeChecksum(userId, weeklyCode, weekVariant, periodFrom, periodTo);
  const schedule = VSG.UTILS.renderWeeklySchedule({ userInfo, weeklyCode, weekVariant, workoutLevel });
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
