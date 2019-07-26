import PropTypes from 'prop-types';

const TextInput = ({ id, label, ...restProps }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input className="form-control" {...restProps} />
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
