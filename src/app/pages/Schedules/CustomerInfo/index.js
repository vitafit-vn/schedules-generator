import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

// Locals
import NumberInput from './NumberInput';
import TextInput from './TextInput';

export default class CustomerInfo extends Component {
  static propTypes = {
    data: PropTypes.shape({
      birthYear: PropTypes.number,
      customerId: PropTypes.string,
      height: PropTypes.number,
      name: PropTypes.string,
      weekPeriod: PropTypes.string,
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
      weeklyCode: presetWeeklyCode,
      weight,
      workoutLevel: presetWorkoutLevel,
    } = this.props.data;

    const weeklyCode = presetWeeklyCode || WEEKLY_SCHEDULES[0].code;
    const workoutLevel = presetWorkoutLevel || WORKOUT_LEVELS[0];

    this.state = { birthYear, customerId, height, name, weekPeriod, weeklyCode, weight, workoutLevel };
  }

  onInputChange = key => event => this.props.onUpdate({ [key]: event.target.value });

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
        onChange={this.onInputChange('weeklyCode')}
        required
        value={selectedWeeklyCode}
      >
        {_.map(WEEKLY_SCHEDULES, ({ code, description, frequency, shortkeys }) => (
          <option title={description} value={code}>{`${frequency} (${shortkeys})`}</option>
        ))}
      </select>
    </div>
  );

  render() {
    const { birthYear, customerId, height, name, weekPeriod, weeklyCode, weight, workoutLevel } = this.props.data;

    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0];
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;

    return (
      <div className="col-3" id="customer-info">
        <TextInput
          id="customer-id"
          label="Mã KH"
          name="customer_id"
          onChange={this.onInputChange('customerId')}
          value={customerId}
        />
        <TextInput id="full-name" label="Tên gọi" name="full_name" onChange={this.onInputChange('name')} value={name} />
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
          max={200}
          min={100}
          name="height"
          onChange={this.onInputChange('height')}
          value={height}
        />
        <NumberInput
          id="weight"
          label="Cân nặng"
          max={100}
          min={30}
          name="weight"
          onChange={this.onInputChange('weight')}
          value={weight}
        />
        {this.renderWorkoutLevels(selectedWorkoutLevel)}
        {this.renderWeeklyCodes(selectedWeeklyCode)}
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
