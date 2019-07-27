// import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import { FormInput } from 'app/components';

const INPUT_IDS = {
  BIRTH_YEAR: 'birthYear',
  CUSTOMER_ID: 'customerId',
  FULL_NAME: 'fullName',
  HEIGHT: 'height',
  ISSUE_DATE: 'issueDate',
  WEIGHT: 'weight',
};

const INPUT_CONFIGS = {
  [INPUT_IDS.BIRTH_YEAR]: { label: 'Năm sinh', max: 2010, min: 1950, type: 'number' },
  [INPUT_IDS.CUSTOMER_ID]: { label: 'Mã KH' },
  [INPUT_IDS.FULL_NAME]: { label: 'Tên gọi' },
  [INPUT_IDS.HEIGHT]: { label: 'Chiều cao', max: 200, min: 100, step: 0.1, suffix: 'cm', type: 'number' },
  [INPUT_IDS.ISSUE_DATE]: { label: 'Ngày đo', type: 'date' },
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
    return <FormInput {...props} id={id} inline onChange={this.onInputChange(id)} required value={value} />;
  };

  render() {
    return (
      <div>
        {this.renderInput(INPUT_IDS.CUSTOMER_ID)}
        {this.renderInput(INPUT_IDS.FULL_NAME)}
        {this.renderInput(INPUT_IDS.BIRTH_YEAR)}
        {this.renderInput(INPUT_IDS.HEIGHT)}
        {this.renderInput(INPUT_IDS.WEIGHT)}
        {this.renderInput(INPUT_IDS.ISSUE_DATE)}
      </div>
    );
  }
}
