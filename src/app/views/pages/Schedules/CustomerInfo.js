import _ from 'lodash';
import fp from 'lodash/fp';
import Preact from 'preact';

// Constants
import { WEEK_VARIANTS_BY_CODES, WEEKLY_SCHEDULES, WORKOUT_LEVELS } from '../../../constants';

export default class CustomerInfo extends Preact.Component {
  state = {
    weeklyCode: WEEKLY_SCHEDULES[0].code,
    weekVariant: 'first_half',
    workoutLevel: WORKOUT_LEVELS[0],
  };

  onWeeklyCodesChange = event => {
    const weeklyCode = event.target.value;
    this.setState({ weeklyCode });
  };

  renderWorkoutLevels = () => (
    <div className="form-group">
      <label htmlFor="workout-level">{'Trình độ'}</label>
      <select className="custom-select" id="workout-level" name="workout_level" required>
        {_.map(WORKOUT_LEVELS, level => (
          <option value={level}>{_.capitalize(level)}</option>
        ))}
      </select>
    </div>
  );

  renderWeeklyCodes = () => (
    <div className="form-group">
      <label htmlFor="weekly-code">{'Preset lịch tuần'}</label>
      <select
        className="custom-select"
        id="weekly-code"
        name="weekly_code"
        onChange={this.onWeeklyCodesChange}
        required
      >
        {_.map(WEEKLY_SCHEDULES, ({ code, description, frequency, shortkeys }) => (
          <option title={description} value={code}>{`${frequency} (${shortkeys})`}</option>
        ))}
      </select>
    </div>
  );

  renderWeekVariants = () => {
    const { weeklyCode } = this.state;

    const options = _.map(WEEK_VARIANTS_BY_CODES[weeklyCode], variant => {
      const title = fp.flow(
        fp.split('_'),
        fp.join(' '),
        fp.capitalize
      )(variant);
      return { title, variant };
    });

    return (
      <div className="form-group">
        <label htmlFor="week-variant">{'Biến thể tuần'}</label>
        <select className="custom-select" id="week-variant" name="week_variant" required>
          {_.map(options, ({ title, variant }) => (
            <option value={variant}>{title}</option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    return (
      <div className="col-3" id="customer-info">
        <div className="form-group">
          <label htmlFor="customer-id">{'Mã KH'}</label>
          <input className="form-control" id="customer-id" name="customer_id" required type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="full-name">{'Họ tên'}</label>
          <input className="form-control" id="full-name" name="full_name" required type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="birth-year">{'Năm sinh'}</label>
          <input
            className="form-control"
            id="birth-year"
            max="2010"
            min="1950"
            name="birth_year"
            required
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">{'Chiều cao'}</label>
          <div className="input-group">
            <input className="form-control" id="height" max="200" min="100" name="height" required type="number" />
            <div className="input-group-append">
              <span className="input-group-text">{'cm'}</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="weight">{'Cân nặng'}</label>
          <div className="input-group">
            <input className="form-control" id="weight" max="100" min="30" name="weight" required type="number" />
            <div className="input-group-append">
              <span className="input-group-text">{'kg'}</span>
            </div>
          </div>
        </div>
        {this.renderWorkoutLevels()}
        {this.renderWeeklyCodes()}
        {this.renderWeekVariants()}
        <div className="form-group">
          <label htmlFor="week-period">{'Tuần'}</label>
          <input className="form-control" id="week-period" name="week_period" required type="week"></input>
        </div>
      </div>
    );
  }
}
