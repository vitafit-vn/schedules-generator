import _ from 'lodash';
import PropTypes from 'prop-types';

const DataInput = ({ name, prefix, suffix, ...restProps }) => (
  <td className="align-middle">
    <div className="input-group input-group-sm">
      {!_.isEmpty(prefix) && (
        <div className="input-group-prepend">
          <span className="input-group-text">{prefix}</span>
        </div>
      )}
      <input className="form-control" name={name} type="text" {...restProps} />
      {!_.isEmpty(suffix) && (
        <div className="input-group-append">
          <span className="input-group-text">{suffix}</span>
        </div>
      )}
    </div>
  </td>
);

DataInput.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

export default DataInput;
