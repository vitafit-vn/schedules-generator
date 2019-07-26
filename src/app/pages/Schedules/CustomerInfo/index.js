import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { TextInput } from 'app/components';

// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

// Locals
import NumberInput from './NumberInput';

const INPUT_CONFIGS = {
  birthYear: { InputComponent: NumberInput, label: 'Năm sinh', max: 2010, min: 1950 },
  customerId: { InputComponent: TextInput, label: 'Mã KH' },
  fullName: { InputComponent: TextInput, label: 'Tên gọi' },
  height: { InputComponent: NumberInput, label: 'Chiều cao', max: 200, min: 100, step: 0.1 },
  weekPeriod: { InputComponent: NumberInput, label: 'Tuần', type: 'week' },
  weight: { InputComponent: NumberInput, label: 'Cân nặng', max: 100, min: 30, step: 0.1 },
};

export default class CustomerInfo extends Component {
  static propTypes = {
    data: PropTypes.shape({
      birthYear: PropTypes.number,
      customerId: PropTypes.string,
      fullName: PropTypes.string,
      height: PropTypes.number,
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
      fullName,
      height,
      weekPeriod,
      weeklyCode: presetWeeklyCode,
      weight,
      workoutLevel: presetWorkoutLevel,
    } = this.props.data;

    const weeklyCode = presetWeeklyCode || WEEKLY_SCHEDULES[0].code;
    const workoutLevel = presetWorkoutLevel || WORKOUT_LEVELS[0];

    this.state = { birthYear, customerId, fullName, height, weekPeriod, weeklyCode, weight, workoutLevel };
  }

  onInputChange = key => event => this.props.onUpdate({ [key]: event.target.value });

  renderInput = id => {
    const { [id]: value } = this.props.data;
    const { InputComponent, ...props } = INPUT_CONFIGS[id];
    return <InputComponent {...props} id={id} onChange={this.onInputChange(id)} value={value} />;
  };

  renderWorkoutLevels = selectedWorkoutLevel => (
    <div className="form-group">
      <label htmlFor="workout-level">{'Trình độ'}</label>
      <select
        className="custom-select"
        id="workoutLevel"
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
        id="weeklyCode"
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
    const { weeklyCode, workoutLevel } = this.props.data;
    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0];
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;

    return (
      <div className="col-3">
        {this.renderInput('customerId')}
        {this.renderInput('fullName')}
        {this.renderInput('birthYear')}
        {this.renderInput('height')}
        {this.renderInput('weight')}
        {this.renderWorkoutLevels(selectedWorkoutLevel)}
        {this.renderWeeklyCodes(selectedWeeklyCode)}
        {this.renderInput('weekPeriod')}
      </div>
    );
  }
}
