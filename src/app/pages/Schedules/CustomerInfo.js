import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';

// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS, WORKOUT_VARIANTS } from 'app/constants';

const INPUT_IDS = {
  BIRTH_YEAR: 'birthYear',
  CUSTOMER_ID: 'customerId',
  FULL_NAME: 'fullName',
  HEIGHT: 'height',
  WEEKLY_CODE: 'weeklyCode',
  WEEK_PERIOD: 'weekPeriod',
  WEIGHT: 'weight',
  WORKOUT_LEVEL: 'workoutLevel',
  WORKOUT_VARIANT: 'workoutVariant',
};

const INPUT_CONFIGS = {
  [INPUT_IDS.BIRTH_YEAR]: { label: 'Năm sinh', max: 2010, min: 1950, type: 'number' },
  [INPUT_IDS.CUSTOMER_ID]: { label: 'Mã KH' },
  [INPUT_IDS.FULL_NAME]: { label: 'Tên gọi' },
  [INPUT_IDS.HEIGHT]: { label: 'Chiều cao', max: 200, min: 100, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.HOME_PREFERRED]: { label: 'Tập tại nhà', type: 'checkbox' },
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
    selectData: _.map(WORKOUT_LEVELS, ({ code: value, description: label }) => ({ label, value })),
    type: 'select',
  },
  [INPUT_IDS.WORKOUT_VARIANT]: {
    label: 'Biến thể',
    selectData: _.map(WORKOUT_VARIANTS, ({ code: value, description: label }) => ({ label, value })),
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
      workoutVariant: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  onInputChange = key => event => this.props.onUpdate({ [key]: event.target.value });

  renderInput = (id, currentValue) => {
    const value = currentValue || this.props.data[id];
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={id} onChange={this.onInputChange(id)} required value={value} />;
  };

  render() {
    const { weeklyCode, workoutLevel, workoutVariant } = this.props.data;
    const selectedWeeklyCode = weeklyCode || WEEKLY_SCHEDULES[0].code;
    const selectedWorkoutLevel = workoutLevel || WORKOUT_LEVELS[0].code;
    const selectedWorkoutVariant = workoutVariant || WORKOUT_VARIANTS[0].code;

    return (
      <div className="col-3">
        {this.renderInput(INPUT_IDS.CUSTOMER_ID)}
        {this.renderInput(INPUT_IDS.FULL_NAME)}
        {this.renderInput(INPUT_IDS.BIRTH_YEAR)}
        {this.renderInput(INPUT_IDS.HEIGHT)}
        {this.renderInput(INPUT_IDS.WEIGHT)}
        {this.renderInput(INPUT_IDS.WORKOUT_VARIANT, selectedWorkoutVariant)}
        {this.renderInput(INPUT_IDS.WORKOUT_LEVEL, selectedWorkoutLevel)}
        {this.renderInput(INPUT_IDS.WEEKLY_CODE, selectedWeeklyCode)}
        {this.renderInput(INPUT_IDS.WEEK_PERIOD)}
      </div>
    );
  }
}
