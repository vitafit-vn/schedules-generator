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
  [INPUT_IDS.EMAIL]: { label: 'Email', required: true, type: 'email' },
  [INPUT_IDS.SELECTED_SCHEDULE]: {
    label: 'Lịch tập',
    required: true,
    type: 'select',
  },
  [INPUT_IDS.SUBJECT]: { label: 'Tiêu đề', required: true },
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
    onRenderHTML: PropTypes.func.isRequired,
  };

  state = DEFAULT_STATE;

  componentDidMount() {
    window.$('#email-composer-modal').on('show.bs.modal', this.onModalShown);
    window.$('#email-composer-modal').on('hide.bs.modal', this.onModalHidden);
    window.$('#email-composer-alert').on('closed.bs.alert', () => this.setState({ alertMessage: undefined }));
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
    const { allSchedules } = this.props.onRenderHTML();
    const scheduleNames = _.map(allSchedules, 'name');
    const selectedSchedule = scheduleNames[0];

    this.setState({ allSchedules, scheduleNames, selectedSchedule });
  };

  onInputChange = key => event => {
    const { value } = event.target;

    this.setState({ [key]: value, alertMessage: undefined });

    if (key === INPUT_IDS.SELECTED_SCHEDULE)
      this.setState({ subject: `[VitaFit VN] Gửi ${this.props.customerInfo.fullName} lịch tập ${value}` });
  };

  onSendEmail = async event => {
    event.preventDefault();
    if (!window.$('#email-composer-modal form')[0].reportValidity()) return;

    const { allSchedules, email: toAddress, selectedSchedule, subject } = this.state;

    try {
      this.setState({ loading: true });
      const schedule = _.find(allSchedules, { name: selectedSchedule });
      const htmlBody = schedule.toHtml();
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
      inline: true,
      inlineLabelClass: 'col-2 pr-0',
      onChange: this.onInputChange(id),
      selectData: id === INPUT_IDS.SELECTED_SCHEDULE ? _.map(scheduleNames, name => ({ value: name })) : undefined,
    };

    return <FormInput {...passedProps} />;
  };

  renderEmailPreview = () => {
    const { allSchedules, selectedSchedule } = this.state;
    if (selectedSchedule == null) return;

    const schedule = _.find(allSchedules, { name: selectedSchedule });
    return <div className="mt-3 mx-auto">{schedule.jsxElement}</div>;
  };

  renderSendButton = () => (
    <TextButton icon="paper-plane" label="Gửi" loading={this.state.loading} onClick={this.onSendEmail} />
  );

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
