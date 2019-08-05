import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';

// Constants
import { ACTIVITY_RATES, GENDERS, TARGETS } from 'app/constants';

const INPUT_IDS = {
  ABS: 'abs',
  ACTIVITY_RATE: 'activityRate',
  BIRTH_YEAR: 'birthYear',
  CUSTOMER_ID: 'customerId',
  FULL_NAME: 'fullName',
  GENDER: 'gender',
  HEIGHT: 'height',
  HIP: 'hip',
  ISSUE_DATE: 'issueDate',
  TARGET: 'target',
  WEIGHT: 'weight',
};

const INPUT_CONFIGS = {
  [INPUT_IDS.ABS]: { label: 'Số đo bụng', max: 150, min: 50, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.ACTIVITY_RATE]: {
    label: 'Mức độ hoạt động',
    selectData: _.map(ACTIVITY_RATES, ({ description: label, value }) => ({ label, value })),
    type: 'select',
  },
  [INPUT_IDS.BIRTH_YEAR]: { label: 'Năm sinh', max: 2010, min: 1950, type: 'number' },
  [INPUT_IDS.CUSTOMER_ID]: { label: 'Mã KH' },
  [INPUT_IDS.FULL_NAME]: { label: 'Tên gọi' },
  [INPUT_IDS.GENDER]: {
    label: 'Giới tính',
    selectData: _.map(GENDERS, ({ code: value, name: label }) => ({ label, value })),
    type: 'select',
  },
  [INPUT_IDS.HEIGHT]: { label: 'Chiều cao', max: 200, min: 100, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.HIP]: { label: 'Số đo hông', max: 150, min: 50, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.ISSUE_DATE]: { label: 'Ngày đo', type: 'date' },
  [INPUT_IDS.TARGET]: {
    label: 'Mục tiêu',
    selectData: _.map(TARGETS, ({ code: value, description: label }) => ({ label, value })),
    type: 'select',
  },
  [INPUT_IDS.WEIGHT]: { label: 'Cân nặng', max: 100, min: 30, step: 0.1, suffix: 'kg', type: 'number' },
};

export default class CustomerInfo extends Component {
  static propTypes = {
    data: PropTypes.shape({
      birthYear: PropTypes.number,
      customerId: PropTypes.string,
      fullName: PropTypes.string,
      height: PropTypes.number,
      issueDate: PropTypes.string,
      weight: PropTypes.number,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { birthYear, customerId, fullName, height, issueDate, weight } = this.props.data;
    this.state = { birthYear, customerId, fullName, height, issueDate, weight };
  }

  onInputChange = key => event => this.props.onUpdate({ [key]: event.target.value });

  renderInput = (id, currentValue) => {
    const value = currentValue || this.props.data[id];
    const { [id]: props } = INPUT_CONFIGS;
    return <FormInput {...props} id={id} onChange={this.onInputChange(id)} required value={value} />;
  };

  render() {
    return (
      <div className="mb-1">
        <div className="row">
          <div className="col">{this.renderInput(INPUT_IDS.CUSTOMER_ID)}</div>
          <div className="col">{this.renderInput(INPUT_IDS.FULL_NAME)}</div>
        </div>
        <div className="row">
          <div className="col">{this.renderInput(INPUT_IDS.BIRTH_YEAR)}</div>
          <div className="col">{this.renderInput(INPUT_IDS.GENDER)}</div>
        </div>
        <div className="row">
          <div className="col">{this.renderInput(INPUT_IDS.HEIGHT)}</div>
          <div className="col">{this.renderInput(INPUT_IDS.WEIGHT)}</div>
        </div>
        <div className="row">
          <div className="col">{this.renderInput(INPUT_IDS.ABS)}</div>
          <div className="col">{this.renderInput(INPUT_IDS.ACTIVITY_RATE)}</div>
        </div>
        <div className="row">
          <div className="col">{this.renderInput(INPUT_IDS.TARGET)}</div>
          <div className="col">{this.renderInput(INPUT_IDS.ISSUE_DATE)}</div>
        </div>
      </div>
    );
  }
}
