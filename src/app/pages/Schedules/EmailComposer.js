import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { Alert, FormInput, ModalContainer, TextButton } from 'app/components';

// Utils
import { axios } from 'app/utils';

const DEFAULT_STATE = {
  alertMessage: undefined,
  allSchedules: [],
  email: undefined,
  loading: false,
  scheduleNames: [],
  selectedSchedule: undefined,
  subject: undefined,
};

const INPUT_IDS = {
  EMAIL: 'email',
  SELECTED_SCHEDULE: 'selectedSchedule',
  SUBJECT: 'subject',
};

const INPUT_CONFIGS = {
  [INPUT_IDS.EMAIL]: { inline: true, label: 'Email', required: true, type: 'email' },
  [INPUT_IDS.SELECTED_SCHEDULE]: { inline: true, label: 'Lịch tập', required: true, type: 'select' },
  [INPUT_IDS.SUBJECT]: { inline: true, label: 'Tiêu đề', required: true },
};

function buildAlertMessage(error, successMessage) {
  if (error == null) {
    return { message: successMessage, type: 'success' };
  }

  const data = _.get(error, 'response.data');

  const message = (
    <div>
      <div>{error.message}</div>
      {!_.isEmpty(data) && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );

  return { message, type: 'danger' };
}

export default class EmailComposer extends Component {
  static propTypes = {
    customerInfo: PropTypes.object,
    onRenderSchedulesHTML: PropTypes.func.isRequired,
  };

  state = DEFAULT_STATE;

  componentDidMount() {
    window.$('#email-composer-modal').on('show.bs.modal', this.onModalShown);
    window.$('#email-composer-modal').on('hide.bs.modal', this.onModalHidden);
    window.$('#email-composer-alert').on('closed.bs.alert', () => this.setState({ alertMessage: undefined }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { allSchedules, selectedSchedule } = this.state;

    if (selectedSchedule !== prevState.selectedSchedule && !_.isEmpty(selectedSchedule)) {
      const schedule = _.find(allSchedules, { name: selectedSchedule });
      window.$('#email-composer-preview').html(schedule.html);
      this.setState({ subject: `[VitaFit VN] Gửi ${this.props.customerInfo.fullName} lịch tập ${selectedSchedule}` });
    }
  }

  onModalHidden = () => {
    this.setState(DEFAULT_STATE); // Clear state
    window.$('#email-composer-preview').empty();
  };

  onModalShown = () => {
    const { dailySchedules, weeklySchedule } = this.props.onRenderSchedulesHTML();
    const allSchedules = [weeklySchedule, ...dailySchedules];
    const scheduleNames = _.map(allSchedules, 'name');
    const selectedSchedule = scheduleNames[0];

    this.setState({ allSchedules, scheduleNames, selectedSchedule });
  };

  onInputChange = key => event => this.setState({ [key]: event.target.value, alertMessage: undefined });

  onSendEmail = async event => {
    event.preventDefault();
    if (!window.$('#email-composer-modal form')[0].reportValidity()) return;

    const { allSchedules, email: toAddress, selectedSchedule, subject } = this.state;
    const { html: htmlBody } = _.find(allSchedules, { name: selectedSchedule });

    try {
      this.setState({ loading: true });
      await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
      this.setState({ alertMessage: buildAlertMessage(undefined, 'Gửi email thành công!'), loading: false });
    } catch (error) {
      console.warn({ ...error });
      this.setState({ alertMessage: buildAlertMessage(error), loading: false });
    }
  };

  renderAlert = () => {
    const { alertMessage } = this.state;
    if (alertMessage == null) return null;

    const { message, type } = alertMessage;

    return (
      <Alert id="email-composer-alert" type={type}>
        {message}
      </Alert>
    );
  };

  renderInput = id => {
    const { [id]: value, scheduleNames } = this.state;
    const { [id]: props } = INPUT_CONFIGS;
    const passedProps = {
      ...props,
      value,
      id: `email-composer-${id}`,
      onChange: this.onInputChange(id),
      selectData: id === INPUT_IDS.SELECTED_SCHEDULE ? _.map(scheduleNames, name => ({ value: name })) : undefined,
    };

    return <FormInput {...passedProps} />;
  };

  renderEmailPreview = () => {
    const { allSchedules, selectedSchedule } = this.state;
    if (selectedSchedule == null) return;

    const schedule = _.find(allSchedules, { name: selectedSchedule });
    return <div className="mt-3 mx-auto" dangerouslySetInnerHTML={{ __html: schedule.html }} />;
  };

  renderSendButton = () => (
    <TextButton icon="paper-plane" label="Gửi" loading={this.state.loading} onClick={this.onSendEmail} />
  );

  // renderScheduleSelector = () => {
  //   const { scheduleNames, selectedSchedule } = this.state;

  //   return (
  //     <div className="form-group row">
  //       <label className="col-2 col-form-label pr-0" htmlFor="email-composer-scheduleSelect">
  //         {'Lịch tập'}
  //       </label>
  //       <div className="col">
  //         <select
  //           className="custom-select"
  //           id="email-composer-scheduleSelect"
  //           onChange={this.onInputChange('selectedSchedule')}
  //           required
  //           value={selectedSchedule}
  //         >
  //           {_.map(scheduleNames, name => (
  //             <option value={name}>{name}</option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    return (
      <ModalContainer id="email-composer-modal" renderPrimaryButton={this.renderSendButton} title="Gửi email lịch tập">
        <form action="#">
          {this.renderAlert()}
          {this.renderInput(INPUT_IDS.EMAIL)}
          {this.renderInput(INPUT_IDS.SELECTED_SCHEDULE)}
          {this.renderInput(INPUT_IDS.SUBJECT)}
        </form>
        {this.renderEmailPreview()}
      </ModalContainer>
    );
  }
}
