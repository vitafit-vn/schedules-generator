import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput, ModalContainer, TextButton } from 'app/components';

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
    allSchedules: [],
    email: undefined,
    errorMessage: undefined,
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

  onInputChange = key => event => this.setState({ [key]: event.target.value, errorMessage: undefined });

  onSendEmail = async event => {
    event.preventDefault();
    if (!window.$('#email-composer-modal form')[0].reportValidity()) return;

    const { allSchedules, email: toAddress, selectedSchedule, subject } = this.state;
    const { html: htmlBody } = _.find(allSchedules, { name: selectedSchedule });

    try {
      this.setState({ loading: true });
      await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
      this.setState({ loading: false });
    } catch (error) {
      console.warn(error);
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  renderInput = id => {
    const { [id]: value } = this.state;
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={`emailComposer-${id}`} onChange={this.onInputChange(id)} value={value} />;
  };

  renderSendButton = () => (
    <TextButton label="Gửi" icon="paper-plane" loading={this.state.loading} onClick={this.onSendEmail} />
  );

  renderScheduleSelector = () => {
    const { scheduleNames, selectedSchedule } = this.state;

    return (
      <div className="form-group row">
        <label className="col-2 col-form-label pr-0" htmlFor="emailComposer.scheduleSelect">
          {'Lịch tập'}
        </label>
        <div className="col">
          <select
            className="custom-select"
            id="emailComposer.scheduleSelect"
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
        <form action="#" onSubmit={this.onSendEmail}>
          {this.renderInput('email')}
          {this.renderInput('subject')}
          {this.renderScheduleSelector()}
          <div className="text-center text-danger">{this.state.errorMessage}</div>
        </form>
        <div className="mt-3" id="email-preview"></div>
      </ModalContainer>
    );
  }
}
