import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { Alert, FormInput, ModalContainer, TextButton } from 'app/components';

// Utils
import { axios } from 'app/utils';

const INPUT_CONFIGS = {
  email: { inline: true, label: 'Email', required: true, type: 'email' },
  subject: { inline: true, label: 'Tiêu đề', required: true },
};

export default class EmailComposer extends Component {
  static propTypes = {
    customerInfo: PropTypes.object,
    onRenderSchedulesHTML: PropTypes.func.isRequired,
  };

  state = {
    alertMessage: undefined,
    allSchedules: [],
    email: undefined,
    loading: false,
    scheduleNames: [],
    selectedSchedule: undefined,
    subject: undefined,
  };

  componentDidMount() {
    window.$('#email-composer-modal').on('show.bs.modal', this.onModalShown);
    window.$('#email-composer-modal').on('hide.bs.modal', this.onModalHidden);
  }

  componentDidUpdate(prevProps, prevState) {
    const { allSchedules, selectedSchedule } = this.state;

    if (selectedSchedule !== prevState.selectedSchedule && !_.isEmpty(selectedSchedule)) {
      const schedule = _.find(allSchedules, { name: selectedSchedule });
      window.$('#email-preview').html(schedule.html);
    }
  }

  onModalHidden = () => {
    this.setState({ email: undefined, selectedSchedule: undefined });
    window.$('#email-preview').empty();
  };

  onModalShown = () => {
    const { customerInfo, onRenderSchedulesHTML } = this.props;
    const { dailySchedules, weeklySchedule } = onRenderSchedulesHTML();
    const allSchedules = _.reject([weeklySchedule, ...dailySchedules], ({ html }) => _.isEmpty(html));
    const scheduleNames = _.map(allSchedules, 'name');
    const selectedSchedule = scheduleNames[0];
    const subject = `[VitaFit VN] Gửi ${customerInfo.fullName} lịch tập ${selectedSchedule}`;

    this.setState({ allSchedules, scheduleNames, selectedSchedule, subject });
  };

  onInputChange = key => event => this.setState({ [key]: event.target.value, alertMessage: undefined });

  onSendEmail = async event => {
    event.preventDefault();
    if (!window.$('#email-composer-modal form')[0].reportValidity()) return;

    const { allSchedules, email: toAddress, selectedSchedule, subject } = this.state;
    const { html: htmlBody } = _.find(allSchedules, { name: selectedSchedule });

    try {
      this.setState({ loading: true });
      // await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
      // this.setState({ alertMessage: { message: 'Gửi email thành công!', type: 'success' }, loading: false });

      setTimeout(
        () => this.setState({ alertMessage: { message: 'Gửi email thành công!', type: 'success' }, loading: false }),
        1000
      );
    } catch (error) {
      console.warn(error);
      const { message } = error;
      this.setState({ alertMessage: { message, type: 'danger' }, loading: false });
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
    const { [id]: value } = this.state;
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={`email-composer-${id}`} onChange={this.onInputChange(id)} value={value} />;
  };

  renderSendButton = () => (
    <TextButton icon="paper-plane" label="Gửi" loading={this.state.loading} onClick={this.onSendEmail} />
  );

  renderScheduleSelector = () => {
    const { scheduleNames, selectedSchedule } = this.state;

    return (
      <div className="form-group row">
        <label className="col-2 col-form-label pr-0" htmlFor="email-composer.scheduleSelect">
          {'Lịch tập'}
        </label>
        <div className="col">
          <select
            className="custom-select"
            id="email-composer.scheduleSelect"
            onChange={this.onInputChange('selectedSchedule')}
            required
            value={selectedSchedule}
          >
            {_.map(scheduleNames, name => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  render() {
    return (
      <ModalContainer id="email-composer-modal" renderPrimaryButton={this.renderSendButton} title="Gửi email lịch tập">
        <form action="#">
          {this.renderAlert()}
          {this.renderInput('email')}
          {this.renderInput('subject')}
          {this.renderScheduleSelector()}
        </form>
        <div className="mt-3" id="email-preview"></div>
      </ModalContainer>
    );
  }
}
