import _ from 'lodash';
import PropTypes from 'prop-types';

const TextButton = ({ background, className, color, disabled, icon, label, loading, ...restProps }) => {
  const iconMargin = _.isEmpty(label) ? '' : 'ml-2';

  return (
    <button
      className={`btn btn-${background} text-${color} ${className}`}
      {...restProps}
      disabled={loading || disabled}
    >
      {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
      {!loading && !_.isEmpty(label) && label}
      {!loading && !_.isEmpty(icon) && <i className={`fa fa-${icon} ${iconMargin} text-${color}`}></i>}
    </button>
  );
};

TextButton.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
};

TextButton.defaultProps = {
  background: 'primary',
  color: 'white',
  disabled: false,
  loading: false,
  type: 'button',
};

export default TextButton;
