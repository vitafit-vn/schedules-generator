import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';
import EmailComposer from 'app/pages/Schedules/EmailComposer';

// Utils
// import { axios } from 'app/utils';

const DEFAULT_STATE = {
  allSchedules: [],
  scheduleNames: [],
  selectedSchedule: undefined,
};

export default class SchedulesEmailComposer extends Component {
  static propTypes = {
    customerInfo: PropTypes.object,
    onRenderSchedules: PropTypes.func.isRequired,
  };

  state = DEFAULT_STATE;

  componentDidMount() {
    window.$('#email-composer-modal').on('hide.bs.modal', this.onModalHidden);
    window.$('#email-composer-modal').on('show.bs.modal', this.onModalShown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSchedule } = this.state;

    if (selectedSchedule !== prevState.selectedSchedule && !_.isEmpty(selectedSchedule)) {
      this.setState({ subject: `[VitaFit VN] Gửi ${this.props.customerInfo.fullName} lịch tập ${selectedSchedule}` });
    }
  }

  onModalHidden = () => {
    this.setState(DEFAULT_STATE); // Clear state
    window.$('#email-composer-preview').empty();
  };

  onModalShown = () => {
    const { allSchedules } = this.props.onRenderSchedules();
    const scheduleNames = _.map(allSchedules, 'name');
    const selectedSchedule = scheduleNames[0];

    this.setState({ allSchedules, scheduleNames, selectedSchedule });
  };

  onSelectedScheduleChange = event => {
    const { value: selectedSchedule } = event.target;
    const subject = `[VitaFit VN] Gửi ${this.props.customerInfo.fullName} lịch tập ${selectedSchedule}`;

    this.setState({ selectedSchedule, subject });
  };

  onSendEmail = async ({ bccAddresses, ccAddresses, toAddresses, subject }) => {
    const { allSchedules, selectedSchedule } = this.state;
    const schedule = _.find(allSchedules, { name: selectedSchedule });
    const htmlBody = schedule.toHtml();
    console.debug({ bccAddresses, ccAddresses, htmlBody, subject, toAddresses });
    // axios.sendHlvOnlineEmail({ bccAddresses, ccAddresses, htmlBody, subject, toAddresses });
  };

  renderEmailPreview = () => {
    const { allSchedules, selectedSchedule } = this.state;
    if (selectedSchedule == null) return null;

    const schedule = _.find(allSchedules, { name: selectedSchedule });

    return (
      <div className="mt-3 mx-auto" id="email-composer-preview">
        {schedule.jsxElement}
      </div>
    );
  };

  renderExtraFields = () => {
    const { scheduleNames, selectedSchedule } = this.state;
    const selectData = _.map(scheduleNames, value => ({ value }));

    return (
      <FormInput
        id="email-composer-selectedSchedule"
        inline
        inlineLabelClass="col-2 pr-0"
        label="Lịch tập"
        onChange={this.onSelectedScheduleChange}
        required
        selectData={selectData}
        type="select"
        value={selectedSchedule}
      />
    );
  };

  render() {
    const { subject } = this.state;

    return (
      <EmailComposer
        overridenData={{ subject }}
        onSendEmail={this.onSendEmail}
        renderExtraFields={this.renderExtraFields}
      >
        {this.renderEmailPreview()}
      </EmailComposer>
    );
  }
}
