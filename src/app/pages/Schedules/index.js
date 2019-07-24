import _ from 'lodash';
import { Component } from 'preact';

// Constants
import { WEEKDAYS } from 'app/constants';

// Template renderers
import { renderDailySchedule, renderWeeklySchedule } from 'app/templates';

// Reusables
import NavBar from 'app/components/NavBar';

// Utils
import { axios, calculateAge, computeChecksum, convertWeekPeriod, zipAndSave } from 'app/utils';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';
import defaultState from './defaultState';

export default class Schedules extends Component {
  state = {
    ...defaultState,
    errorMessage: undefined,
    loading: false,
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

    return { checksum, customerInfo, dailySchedules, weeklySchedule };
  };

  onUpdateCustomerInfo = partial =>
    this.setState(({ customerInfo }) => ({ customerInfo: { ...customerInfo, ...partial } }));

  onUpdatePersonalizedData = partial =>
    this.setState(({ personalizedData }) => ({ personalizedData: { ...personalizedData, ...partial } }));

  onDownloadSchedules = async () => {
    const { checksum, customerInfo, dailySchedules, weeklySchedule } = this.renderSchedulesHTML();
    const prefix = `${customerInfo.customerId}_${checksum.substring(checksum.length - 6)}`;
    const dailyFiles = _.map(dailySchedules, (content, index) => {
      if (_.isEmpty(content)) return undefined;

      return {
        content,
        fileName: `${prefix}-daily-${WEEKDAYS[index]}.html`,
      };
    });

    const allFiles = [{ content: weeklySchedule, fileName: `${prefix}-weekly.html` }, ..._.compact(dailyFiles)];

    try {
      await zipAndSave(allFiles, `${prefix}.zip`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onEmailSchedules = async () => {
    const { customerInfo, weeklySchedule: htmlBody } = this.renderSchedulesHTML();
    const { email: toAddress = 'success@simulator.amazonses.com', name } = customerInfo;

    this.setState({ errorMessage: undefined, loading: true });

    try {
      const subject = `[VitaFit VN] Gửi ${name} lịch tập tuần`;
      await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
      this.setState({ loading: false });
    } catch (error) {
      console.warn(error);
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  onShowSchedules = event => {
    event.preventDefault();

    const { dailySchedules, weeklySchedule } = this.renderSchedulesHTML();
    document.getElementById('schedules-wrapper').innerHTML = [weeklySchedule, ...dailySchedules].join('\n');
  };

  render() {
    const { customerInfo, errorMessage, loading, personalizedData } = this.state;

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
            <FormControls
              errorMessage={errorMessage}
              loading={loading}
              onDownload={this.onDownloadSchedules}
              onEmail={this.onEmailSchedules}
            />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </div>
    );
  }
}
