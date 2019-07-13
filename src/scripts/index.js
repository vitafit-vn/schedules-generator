function toggleLoading(loading) {
  if (!loading) {
    $('.loading-ring').addClass('hidden');
    return;
  }

  $('.loading-ring').removeClass('hidden');
  $('#schedule-container').empty();
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

    const checksum = 'abc123';
    const userId = 'KH0001';
    const record = {
      code: 'WS08',
      byWeeks: [
        {
          weekNumber: 'week_1',
          weekDays: [
            'UPPER-3',
            'LOWER-4',
            'NGHỈ',
            'UPPER-4',
            'LOWER-3',
            'NGHỈ',
            'CARDIO-1\nCARDIO-2\nCARDIO-3\nCARDIO-4',
          ],
        },
      ],
    };
    const schedule = await VSG.renderWeeklySchedule(record, 'week_1');

    toggleLoading(false);
    downloadSchedule(schedule, checksum, userId);
    $('#schedule-wrapper').html(schedule);
  } catch (error) {
    toggleLoading(false);
    console.debug(error);
    alert(error.message);
  }
}

// $(document).ready(() => {
// });
