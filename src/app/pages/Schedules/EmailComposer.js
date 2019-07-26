import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { ModalContainer, TextButton } from 'app/components';

// Utils
import { axios } from 'app/utils';

export default class EmailComposer extends Component {
  static propTypes = {
    customerName: PropTypes.string,
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
    const { customerName, onRenderSchedulesHTML } = this.props;
    const { dailySchedules, weeklySchedule } = onRenderSchedulesHTML();
    const allSchedules = _.reject([weeklySchedule, ...dailySchedules], ({ html }) => _.isEmpty(html));
    const scheduleNames = _.map(allSchedules, 'name');
    const selectedSchedule = scheduleNames[0];
    const subject = `[VitaFit VN] Gửi ${customerName} lịch tập ${selectedSchedule}`;

    this.setState({ allSchedules, scheduleNames, selectedSchedule, subject });
  };

  onInputChange = key => event => this.setState({ [key]: event.target.value, errorMessage: undefined });

  onSendEmail = async event => {
    event.preventDefault();

    const { allSchedules, email: toAddress, selectedSchedule, subject } = this.state;
    const { html: htmlBody } = _.find(allSchedules, { name: selectedSchedule });

    try {
      this.setState({ loading: true });
      // await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress });
      // this.setState({ loading: false });
      setTimeout(() => this.setState({ errorMessage: 'Test message!', loading: false }), 1000);
    } catch (error) {
      console.warn(error);
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  renderEmailInput = () => (
    <div className="form-group row">
      <label className="col-2 col-form-label" htmlFor="email-composer-email">
        {'Email'}
      </label>
      <div className="col">
        <input
          className="form-control"
          id="email-composer-email"
          name="email"
          onChange={this.onInputChange('email')}
          type="email"
          value={this.state.email}
        />
      </div>
    </div>
  );

  renderSubjectInput = () => (
    <div className="form-group row">
      <label className="col-2 col-form-label" htmlFor="email-composer-subject">
        {'Tiêu đề'}
      </label>
      <div className="col">
        <input
          className="form-control"
          id="email-composer-subject"
          name="email"
          onChange={this.onInputChange('subject')}
          value={this.state.subject}
        />
      </div>
    </div>
  );

  renderScheduleSelector = () => {
    const { loading, scheduleNames, selectedSchedule } = this.state;

    return (
      <div className="form-group row">
        <label className="col-2 col-form-label pr-0" htmlFor="email-composer-selected-schedule">
          {'Lịch tập'}
        </label>
        <div className="col">
          <select
            className="custom-select"
            id="email-composer-selected-schedule"
            name="schedule_name"
            onChange={this.onInputChange('selectedSchedule')}
            required
            value={selectedSchedule}
          >
            {_.map(scheduleNames, name => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="col-auto d-flex justify-content-end">
          <TextButton icon="paper-plane" loading={loading} type="submit" />
        </div>
      </div>
    );
  };

  render() {
    return (
      <ModalContainer id="email-composer-modal" title="Gửi email lịch tập">
        <form action="#" onSubmit={this.onSendEmail}>
          {this.renderEmailInput()}
          {this.renderSubjectInput()}
          {this.renderScheduleSelector()}
          <div className="text-center text-danger">{this.state.errorMessage}</div>
        </form>
        <div className="mt-3" id="email-preview"></div>
      </ModalContainer>
    );
  }
}
