import PropTypes from 'prop-types';

const Toast = ({ message }) => (
  <div aria-atomic="true" aria-live="assertive" className="toast" role="alert">
    <div className="toast-header">
      <img className="rounded mr-2" src="..." />
      <strong className="mr-auto">{'VitaFit Tools'}</strong>
      <small>{'11 mins ago'}</small>
      <button aria-label="Close" className="close mb-1 ml-2" data-dismiss="toast" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">{message}</div>
  </div>
);

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Toast;
