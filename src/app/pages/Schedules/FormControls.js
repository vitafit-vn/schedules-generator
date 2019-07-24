import _ from 'lodash';
import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const FormControls = ({ errorMessage, loading, onDownload, onEmail }) => (
  <div className="row">
    <div className="align-items-center col d-flex justify-content-end">
      <div className={`${loading ? '' : 'd-none'} spinner-border text-primary`} role="status"></div>
    </div>
    {!_.isEmpty(errorMessage) && (
      <div className="align-items-center col-auto d-flex justify-content-end">
        <div className="text-danger text-right">{errorMessage}</div>
      </div>
    )}
    <div className="col-auto">
      <TextButton icon="file-text" label="Xem trước" type="submit" />
    </div>
    <div className="col-auto">
      <TextButton icon="paper-plane" label="Gửi email" onClick={onEmail} type="submit" />
    </div>
    <div className="col-auto">
      <TextButton icon="download" label="Tải file HTML" onClick={onDownload} type="submit" />
    </div>
  </div>
);

FormControls.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
  onEmail: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

export default FormControls;
