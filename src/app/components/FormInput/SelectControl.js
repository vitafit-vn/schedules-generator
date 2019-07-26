import _ from 'lodash';
import PropTypes from 'prop-types';

const SelectControl = ({ selectData, ...restProps }) => (
  <select className="custom-select" {...restProps}>
    {_.map(selectData, ({ label, title, value }) => (
      <option title={title} value={value}>
        {_.isEmpty(label) ? value : label}
      </option>
    ))}
  </select>
);

SelectControl.propTypes = {
  selectData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default SelectControl;
