import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import ModalContainer from 'app/components/ModalContainer';
import TextButton from 'app/components/TextButton';

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
    const { dailySchedules, weeklySchedule } = this.props.onRenderSchedulesHTML();
    const allSchedules = _.reject([weeklySchedule, ...dailySchedules], ({ html }) => _.isEmpty(html));
    const scheduleNames = _.map(allSchedules, 'name');

    this.setState({ allSchedules, scheduleNames });
  };

  onInputChange = key => event => this.setState({ [key]: event.target.value });

  onSendEmail = async event => {
    event.preventDefault();

    const { customerName } = this.props;
    const { allSchedules, email, selectedSchedule } = this.state;
    const { html: htmlBody } = _.find(allSchedules, { name: selectedSchedule });

    const subject = `[VitaFit VN] Gửi ${customerName} lịch tập ${selectedSchedule}`;

    try {
      this.setState({ loading: true });
      await axios.sendHlvOnlineEmail({ htmlBody, subject, toAddress: email });
      this.setState({ loading: false });
    } catch (error) {
      console.warn(error);
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  renderEmailInput = () => (
    <div className="form-group row">
      <label className="col-3 col-form-label" htmlFor="email">
        {'Email'}
      </label>
      <div className="col">
        <input
          className="form-control"
          id="email"
          name="email"
          onChange={this.onInputChange('email')}
          type="email"
          value={this.state.email}
        />
      </div>
    </div>
  );

  renderScheduleSelector = () => {
    const { scheduleNames, selectedSchedule } = this.state;
    return (
      <div className="form-group row">
        <label className="col-3 col-form-label" htmlFor="schedule-name">
          {'Lịch tập'}
        </label>
        <div className="col">
          <select
            className="custom-select"
            id="schedule-name"
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
      </div>
    );
  };

  render() {
    return (
      <ModalContainer id="email-composer-modal" title="Gửi email lịch tập">
        <form action="#" onSubmit={this.onSendEmail}>
          <div className="row">
            <div className="col">
              {this.renderEmailInput()}
              {this.renderScheduleSelector()}
            </div>
            <div className="align-items-center col-2 d-flex mb-3">
              <TextButton label="Gửi" type="submit" />
            </div>
          </div>
        </form>
        <div id="email-preview"></div>
      </ModalContainer>
    );
  }
}
