import PropTypes from 'prop-types';

// Locals
import InputControl from './InputControl';

const FormInput = ({ id, inline, inlineLabelWidth, label, ...restProps }) => {
  if (!inline) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <InputControl id={id} {...restProps} />
      </div>
    );
  }

  return (
    <div className="form-group row">
      <label className={`col-${inlineLabelWidth} col-form-label`} htmlFor={id}>
        {label}
      </label>
      <div className="col">
        <InputControl id={id} {...restProps} />
      </div>
    </div>
  );
};

FormInput.propTypes = {
  ...InputControl.propTypes,
  inline: PropTypes.bool,
  inlineLabelWidth: PropTypes.number,
  label: PropTypes.string.isRequired,
};

FormInput.defaultProps = {
  inline: false,
  inlineLabelWidth: 2,
  type: 'text',
};

export default FormInput;
