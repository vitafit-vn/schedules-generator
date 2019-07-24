import PropTypes from 'prop-types';

const TextInput = ({ id, label, ...restProps }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input className="form-control" required {...restProps} />
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  required: true,
  type: 'text',
};

export default TextInput;
