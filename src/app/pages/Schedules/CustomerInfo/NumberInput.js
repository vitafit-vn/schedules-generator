import _ from 'lodash';
import PropTypes from 'prop-types';

const NumberInput = ({ id, label, suffix, ...restProps }) => {
  if (_.isEmpty(suffix)) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input className="form-control" id={id} {...restProps} />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-group">
        <input className="form-control" id={id} {...restProps} />
        <div className="input-group-append">
          <span className="input-group-text">{suffix}</span>
        </div>
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

NumberInput.defaultProps = {
  required: true,
  type: 'number',
};

export default NumberInput;
