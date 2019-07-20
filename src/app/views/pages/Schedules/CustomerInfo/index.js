import _ from 'lodash';
import fp from 'lodash/fp';
import Preact from 'preact';
import PropTypes from 'prop-types';

// Constants
import { WEEK_VARIANTS_BY_CODES, WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

// Locals
import NumberInput from './NumberInput';

export default class CustomerInfo extends Preact.Component {
  static propTypes = {
    data: PropTypes.shape({
      birthYear: PropTypes.number,
      customerId: PropTypes.string,
      height: PropTypes.number,
      name: PropTypes.string,
      weekVariant: PropTypes.string,
      weeklyCode: PropTypes.string,
      weight: PropTypes.number,
      workoutLevel: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      birthYear,
      customerId,
      height,
      name,
      weekPeriod,
      weekVariant: presetWeekVariant,
      weeklyCode: presetWeeklyCode,
      weight,
      workoutLevel: presetWorkoutLevel,
    } = this.props.data;

    const weeklyCode = presetWeeklyCode || WEEKLY_SCHEDULES[0].code;
    const weekVariant = presetWeekVariant || WEEK_VARIANTS_BY_CODES[weeklyCode][0];
    const workoutLevel = presetWorkoutLevel || WORKOUT_LEVELS[0];

    this.state = { birthYear, customerId, height, name, weekPeriod, weekVariant, weeklyCode, weight, workoutLevel };
  }

  onInputChange = key => event => this.onUpdate({ [key]: event.target.value });

  onWeeklyCodesChange = event => {
    const weeklyCode = event.target.value;
    const weekVariant = WEEK_VARIANTS_BY_CODES[weeklyCode][0];
    this.onUpdate({ weeklyCode, weekVariant });
  };

  renderWorkoutLevels = selectedWorkoutLevel => (
    <div className="form-group">
      <label htmlFor="workout-level">{'Trình độ'}</label>
      <select
        className="custom-select"
        id="workout-level"
        name="workout_level"
        onChange={this.onInputChange('workoutLevel')}
        required
        value={selectedWorkoutLevel}
      >
        {_.map(WORKOUT_LEVELS, level => (
          <option value={level}>{_.capitalize(level)}</option>
        ))}
      </select>
    </div>
  );

  renderWeeklyCodes = selectedWeeklyCode => (
    <div className="form-group">
      <label htmlFor="weekly-code">{'Preset lịch tuần'}</label>
      <select
        className="custom-select"
        id="weekly-code"
        name="weekly_code"
        onChange={this.onWeeklyCodesChange}
        required
        value={selectedWeeklyCode}
      >
        {_.map(WEEKLY_SCHEDULES, ({ code, description, frequency, shortkeys }) => (
          <option title={description} value={code}>{`${frequency} (${shortkeys})`}</option>
        ))}
      </select>
    </div>
  );

  renderWeekVariants = (selectedWeeklyCode, selectedWeekVariant) => {
    const options = _.map(WEEK_VARIANTS_BY_CODES[selectedWeeklyCode], variant => {
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
          onChange={this.onInputChange('weekVariant')}
          required
          value={selectedWeekVariant}
        >
          {_.map(options, ({ title, variant }) => (
            <option value={variant}>{title}</option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    const {
      birthYear,
      customerId,
      height,
      name,
      weekPeriod,
      weekVariant,
      weeklyCode,
      weight,
      workoutLevel,
    } = this.props.data;

    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0];
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;

    const availableVariants = WEEK_VARIANTS_BY_CODES[selectedWeeklyCode];
    const selectedWeekVariant = _.includes(availableVariants, weekVariant) ? weekVariant : availableVariants[0];

    return (
      <div className="col-3" id="customer-info">
        <div className="form-group">
          <label htmlFor="customer-id">{'Mã KH'}</label>
          <input
            className="form-control"
            id="customer-id"
            name="customer_id"
            onChange={this.onInputChange('customerId')}
            required
            type="text"
            value={customerId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="full-name">{'Họ tên'}</label>
          <input
            className="form-control"
            id="full-name"
            name="full_name"
            onChange={this.onInputChange('name')}
            required
            type="text"
            value={name}
          />
        </div>
        <NumberInput
          id="birth-year"
          label="Năm
          sinh"
          max="2010"
          min="1950"
          name="birth_year"
          onChange={this.onInputChange('birthYear')}
          value={birthYear}
        />
        <NumberInput
          id="height"
          label="Chiều
          cao"
          max="200"
          min="100"
          name="height"
          onChange={this.onInputChange('height')}
          value={height}
        />
        <NumberInput
          id="weight"
          label="Cân nặng"
          max="100"
          min="30"
          name="weight"
          onChange={this.onInputChange('weight')}
          value={weight}
        />
        {this.renderWorkoutLevels(selectedWorkoutLevel)}
        {this.renderWeeklyCodes(selectedWeeklyCode)}
        {this.renderWeekVariants(selectedWeeklyCode, selectedWeekVariant)}
        <NumberInput
          id="week-period"
          label="Tuần"
          name="week_period"
          type="week"
          onChange={this.onInputChange('weekPeriod')}
          value={weekPeriod}
        />
      </div>
    );
  }
}
