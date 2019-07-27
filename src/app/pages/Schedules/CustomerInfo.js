import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';

// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

const INPUT_IDS = {
  BIRTH_YEAR: 'birthYear',
  CUSTOMER_ID: 'customerId',
  FULL_NAME: 'fullName',
  HEIGHT: 'height',
  WEEK_PERIOD: 'weekPeriod',
  WEEKLY_CODE: 'weeklyCode',
  WEIGHT: 'weight',
  WORKOUT_LEVEL: 'workoutLevel',
};

const INPUT_CONFIGS = {
  [INPUT_IDS.BIRTH_YEAR]: { label: 'Năm sinh', max: 2010, min: 1950, type: 'number' },
  [INPUT_IDS.CUSTOMER_ID]: { label: 'Mã KH' },
  [INPUT_IDS.FULL_NAME]: { label: 'Tên gọi' },
  [INPUT_IDS.HEIGHT]: { label: 'Chiều cao', max: 200, min: 100, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.WEEK_PERIOD]: { label: 'Tuần', type: 'week' },
  [INPUT_IDS.WEEKLY_CODE]: {
    label: 'Preset lịch tuần',
    selectData: _.map(WEEKLY_SCHEDULES, ({ code, description, frequency, shortkeys }) => ({
      title: description,
      value: code,
      label: `${frequency} (${shortkeys})`,
    })),
    type: 'select',
  },
  [INPUT_IDS.WEIGHT]: { label: 'Cân nặng', max: 100, min: 30, step: 0.1, suffix: 'kg', type: 'number' },
  [INPUT_IDS.WORKOUT_LEVEL]: {
    label: 'Trình độ',
    selectData: _.map(WORKOUT_LEVELS, value => ({ value, label: _.capitalize(value) })),
    type: 'select',
  },
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

  renderInput = (id, currentValue) => {
    const value = currentValue || this.props.data[id];
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={id} onChange={this.onInputChange(id)} required value={value} />;
  };

  render() {
    const { weeklyCode, workoutLevel } = this.props.data;
    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0];
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;

    return (
      <div className="col-3">
        {this.renderInput(INPUT_IDS.CUSTOMER_ID)}
        {this.renderInput(INPUT_IDS.FULL_NAME)}
        {this.renderInput(INPUT_IDS.BIRTH_YEAR)}
        {this.renderInput(INPUT_IDS.HEIGHT)}
        {this.renderInput(INPUT_IDS.WEIGHT)}
        {this.renderInput(INPUT_IDS.WORKOUT_LEVEL, selectedWorkoutLevel)}
        {this.renderInput(INPUT_IDS.WEEKLY_CODE, selectedWeeklyCode)}
        {this.renderInput(INPUT_IDS.WEEK_PERIOD)}
      </div>
    );
  }
}
