import _ from 'lodash';
import PropTypes from 'prop-types';

const TextButton = ({ background, icon, label, ...restProps }) => (
  <button className={`btn btn-${background}`} {...restProps}>
    {label}
    {!_.isEmpty(icon) && <i className={`fa fa-${icon} ml-1 text-white`}></i>}
  </button>
);

TextButton.propTypes = {
  background: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};

TextButton.defaultProps = {
  background: 'primary',
  type: 'button',
};

export default TextButton;
