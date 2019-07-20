import _ from 'lodash';
import fp from 'lodash/fp';
import Preact from 'preact';
import PropTypes from 'prop-types';

// Constants
import { WEEK_VARIANTS_BY_CODES, WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

const NumberInput = ({ id, label, suffix, ...restProps }) => {
  if (_.isEmpty(suffix)) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input className="form-control" id={id} {...restProps} />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-group">
        <input className="form-control" id={id} {...restProps} />
        <div className="input-group-append">
          <span className="input-group-text">{suffix}</span>
        </div>
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

NumberInput.defaultProps = {
  required: true,
  type: 'number',
};

export default class CustomerInfo extends Preact.Component {
  constructor(props) {
    super(props);

    const { code: weeklyCode } = WEEKLY_SCHEDULES[0];
    const weekVariant = WEEK_VARIANTS_BY_CODES[weeklyCode][0];
    this.state = { weeklyCode, weekVariant, workoutLevel: WORKOUT_LEVELS[0] };
  }

  onWeeklyCodesChange = event => {
    const weeklyCode = event.target.value;
    const weekVariant = WEEK_VARIANTS_BY_CODES[weeklyCode][0];
    this.setState({ weeklyCode, weekVariant });
  };

  onWeekVariantChange = event => this.setState({ weekVariant: event.target.value });

  onWorkoutLevelChange = event => this.setState({ workoutLevel: event.target.value });

  renderWorkoutLevels = () => (
    <div className="form-group">
      <label htmlFor="workout-level">{'Trình độ'}</label>
      <select
        className="custom-select"
        id="workout-level"
        name="workout_level"
        onChange={this.onWorkoutLevelChange}
        required
      >
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
        <select
          className="custom-select"
          id="week-variant"
          name="week_variant"
          onChange={this.onWeekVariantChange}
          required
        >
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
        <NumberInput id="birth-year" label="Năm sinh" max="2010" min="1950" name="birth_year" />
        <NumberInput id="height" label="Chiều cao" max="200" min="100" name="height" />
        <NumberInput id="weight" label="Cân nặng" max="100" min="30" name="weight" />
        {this.renderWorkoutLevels()}
        {this.renderWeeklyCodes()}
        {this.renderWeekVariants()}
        <NumberInput id="week-period" label="Tuần" name="week_period" type="week" />
      </div>
    );
  }
}
