import PropTypes from 'prop-types';

const Alert = ({ children, id, type }) => (
  <div id={id} className={`alert alert-dismissible alert-${type} fade show`} role="alert">
    {children}
    <button aria-label="Close" className="close" data-dismiss="alert" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

Alert.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'danger',
};

export default Alert;
