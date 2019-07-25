import _ from 'lodash';
import { Component } from 'preact';

// Constants
import { WEEKDAYS } from 'app/constants';

// Template renderers
import { renderSchedulesHTML } from 'app/templates';

// Reusables
import NavBar from 'app/components/NavBar';

// Utils
import { axios, zipAndSave } from 'app/utils';

import CustomerInfo from './CustomerInfo';
import EmailComposer from './EmailComposer';
import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import defaultState from './defaultState';

export default class Schedules extends Component {
  state = defaultState;

  onUpdateCustomerInfo = partial =>
    this.setState(({ customerInfo }) => ({ customerInfo: { ...customerInfo, ...partial } }));

  onUpdatePersonalizedData = partial =>
    this.setState(({ personalizedData }) => ({ personalizedData: { ...personalizedData, ...partial } }));

  onDownloadSchedules = async () => {
    const { checksum, dailySchedules, weeklySchedule } = renderSchedulesHTML(this.state);
    const prefix = `${this.state.customerInfo.customerId}_${checksum.substring(checksum.length - 6)}`;
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
      alert(error.message); // eslint-disable-line no-alert
    }
  };

  onEmailSchedules = async ({ email: toAddress, htmlBody, scheduleName }) => {
    const { name } = this.state.customerInfo;

    try {
      const subject = `[VitaFit VN] Gửi ${name} lịch tập ${scheduleName}`;
      await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
    } catch (error) {
      console.warn(error);
    }
  };

  onPreviewSchedules = event => {
    event.preventDefault();

    const { dailySchedules, weeklySchedule } = renderSchedulesHTML(this.state);
    document.getElementById('schedules-wrapper').innerHTML = [weeklySchedule, ...dailySchedules].join('\n');
  };

  render() {
    const { customerInfo, personalizedData } = this.state;

    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onPreviewSchedules}>
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
          <EmailComposer
            onRenderSchedulesHTML={() => renderSchedulesHTML(this.state)}
            onSendEmail={this.onEmailSchedules}
          />
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </div>
    );
  }
}
