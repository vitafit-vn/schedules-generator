function toggleLoading(loading) {
  if (!loading) {
    $('.loading-ring').addClass('hidden');
    return;
  }

  $('.loading-ring').removeClass('hidden');
  $('#schedule-container').empty();
}

async function generateScheduleFromInputs() {
  const userId = $('#user-data input[name=user_id]').val();
  const name = $('#user-data input[name=full_name]').val();
  const height = $('#user-data input[name=height]').val();
  const weight = $('#user-data input[name=weight]').val();
  const weeklyCode = $('#user-data select[name=weekly_code]').val();
  const weekNumber = $('#user-data select[name=week_number]').val();
  const checksum = window.VSG.computeChecksum(userId, height, weight);
  const userInfo = {
    userId,
    name,
    height,
    weight,
  };
  const weeklyData = _.find(window.VSG.WEEKLY_SCHEDULES, { code: weeklyCode });
  const schedule = await VSG.renderWeeklySchedule(weeklyData, weekNumber, userInfo);

  return { checksum, schedule, userId };
}

function downloadSchedule(schedule, checksum, userId) {
  const scheduleBlob = new Blob([schedule], { type: 'text/html;charset=utf-8' });
  const anchor = document.createElement('a', { id: 'schedule-download' });
  anchor.href = URL.createObjectURL(scheduleBlob);
  anchor.download = `${userId}_${checksum.substring(checksum.length - 6)}.html`;
  anchor.click();
}

async function handleInputData() {
  try {
    toggleLoading(true);

    const { checksum, schedule, userId } = await generateScheduleFromInputs();

    toggleLoading(false);
    // downloadSchedule(schedule, checksum, userId);
    $('#schedule-wrapper').html(schedule);
  } catch (error) {
    toggleLoading(false);
    console.debug(error);
    alert(error.message);
  }
}
