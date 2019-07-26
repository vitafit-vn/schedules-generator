import _ from 'lodash';
import PropTypes from 'prop-types';

const InputControl = ({ id, prefix, suffix, ...restProps }) => {
  const inputElement = <input className="form-control" id={id} {...restProps} />;
  if (_.isEmpty(prefix) && _.isEmpty(suffix)) return inputElement;

  return (
    <div className="input-group">
      {!_.isEmpty(prefix) && (
        <div className="input-group-prepend">
          <span className="input-group-text">{prefix}</span>
        </div>
      )}
      {inputElement}
      {!_.isEmpty(suffix) && (
        <div className="input-group-append">
          <span className="input-group-text">{suffix}</span>
        </div>
      )}
    </div>
  );
};

InputControl.propTypes = {
  id: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

export default InputControl;
