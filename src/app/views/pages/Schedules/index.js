import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import _ from 'lodash';
import Preact from 'preact';

// Constants
import { WEEKDAYS } from 'app/constants';

// Template renderers
import { renderDailySchedule, renderWeeklySchedule } from 'app/renderers';

// Reusables
import NavBar from 'app/views/reusables/NavBar';

// Utils
import { calculateAge, computeChecksum, convertWeekPeriod } from 'app/utils';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';

export default class Schedules extends Preact.Component {
  state = {
    // customerInfo: {
    //   birthYear: '1997',
    //   customerId: 'KH0001',
    //   height: '154',
    //   name: 'Chị Bảo',
    //   weeklyCode: 'WS09',
    //   weight: '54',
    //   workoutLevel: 'beginner',
    //   weekPeriod: '2019-W30',
    // },
    // personalizedData: {
    //   bulkRecommendedWeight: '3 - 4',
    //   bulkRest: '30 - 45',
    //   bulkRpe: '8',
    //   recommendedWeight: {},
    //   rest: {},
    //   rpe: {},
    // },
    customerInfo: {
      birthYear: undefined,
      customerId: undefined,
      height: undefined,
      name: undefined,
      weeklyCode: undefined,
      weight: undefined,
      workoutLevel: undefined,
      weekPeriod: undefined,
    },
    personalizedData: {
      bulkRecommendedWeight: undefined,
      bulkRest: undefined,
      bulkRpe: undefined,
      recommendedWeight: {},
      rest: {},
      rpe: {},
    },
  };

  renderSchedulesHTML = () => {
    const {
      customerInfo: { birthYear, customerId, weeklyCode, weekPeriod, workoutLevel, ...restInfo },
      personalizedData,
    } = this.state;

    const checksum = computeChecksum(customerId, workoutLevel, weeklyCode, weekPeriod);

    const customerInfo = {
      ...restInfo,
      weeklyCode,
      workoutLevel,
      age: calculateAge(birthYear),
      weekStart: convertWeekPeriod(weekPeriod),
    };

    const dailySchedules = _.map(_.range(WEEKDAYS.length), dayIndex =>
      renderDailySchedule({ customerInfo, dayIndex, personalizedData })
    );
    const weeklySchedule = renderWeeklySchedule({ customerInfo, personalizedData });

    return { checksum, customerId, dailySchedules, weeklySchedule };
  };

  onUpdateCustomerInfo = partial =>
    this.setState(({ customerInfo }) => ({ customerInfo: { ...customerInfo, ...partial } }));

  onUpdatePersonalizedData = partial =>
    this.setState(({ personalizedData }) => ({ personalizedData: { ...personalizedData, ...partial } }));

  onDownloadSchedules = async () => {
    const { checksum, customerId, dailySchedules, weeklySchedule } = this.renderSchedulesHTML();
    const prefix = `${customerId}_${checksum.substring(checksum.length - 6)}`;

    try {
      const zip = new JSZip();

      zip.file(`${prefix}-weekly.html`, weeklySchedule);
      _.each(dailySchedules, (dailySchedule, index) => {
        if (_.isEmpty(dailySchedule)) return;
        const weekday = WEEKDAYS[index];
        zip.file(`${prefix}-daily-${weekday}.html`, dailySchedule);
      });

      const downloadContent = await zip.generateAsync({ type: 'blob' });
      saveAs(downloadContent, `${prefix}.zip`);
    } catch (error) {
      console.warn(error);
    }
  };

  onShowSchedules = event => {
    event.preventDefault();

    const { dailySchedules, weeklySchedule } = this.renderSchedulesHTML();
    document.getElementById('schedules-wrapper').innerHTML = [weeklySchedule, ...dailySchedules].join('\n');
  };

  render() {
    const { customerInfo, personalizedData } = this.state;

    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onShowSchedules}>
            <div className="row">
              <CustomerInfo data={customerInfo} onUpdate={this.onUpdateCustomerInfo} />
              <PersonalizedTable
                customerInfo={customerInfo}
                data={personalizedData}
                onUpdate={this.onUpdatePersonalizedData}
              />
            </div>
            <FormControls onDownload={this.onDownloadSchedules} />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </div>
    );
  }
}
