import _ from 'lodash';
import PropTypes from 'prop-types';

const TextButton = ({ icon, label, ...restProps }) => (
  <button className="btn btn-primary" {...restProps}>
    {label}
    {!_.isEmpty(icon) && <i className={`fa fa-${icon} ml-1 text-white`}></i>}
  </button>
);

TextButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};

TextButton.defaultProps = {
  type: 'button',
};

export default TextButton;
