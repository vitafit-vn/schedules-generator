function toggleLoading(loading) {
  if (!loading) {
    $('.loading-ring').addClass('hidden');
    $('#reports-input')[0].value = null;
    return;
  }

  $('.loading-ring').removeClass('hidden');
  $('#report-container').empty();
}

function downloadSchedule(schedule, checksum, userId) {
  const reportBlob = new Blob([schedule], { type: 'text/html;charset=utf-8' });
  const anchor = document.createElement('a', { id: 'report-download' });
  anchor.href = URL.createObjectURL(reportBlob);
  anchor.download = `${userId}_${checksum.substring(checksum.length - 6)}.html`;
  anchor.click();
}

async function handleInputFiles() {
  try {
    toggleLoading(true);

    const [record] = records;
    const report = await ZCR.renderChartReading(record);

    toggleLoading(false);
    downloadReport(report, record);
    $('#report-wrapper').html(report);
  } catch (error) {
    toggleLoading(false);
    console.debug(error);
    alert(error.message);
  }
}

// $(document).ready(() => {
// });
