import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const FormControls = ({ onDownload, onSendEmail }) => (
  <div className="row">
    <div className="align-items-center col d-flex justify-content-end">
      <div className="d-none spinner-border text-primary" id="loading-spinner" role="status"></div>
    </div>
    <div className="col-auto">
      <TextButton icon="file-text" label="Xem lịch" type="submit" />
    </div>
    <div className="col-auto">
      <TextButton icon="paper-plane" label="Gửi email" onClick={onSendEmail} />
    </div>
    <div className="col-auto">
      <TextButton icon="file-text" label="Tải file HTML" onClick={onDownload} />
    </div>
  </div>
);

FormControls.propTypes = {
  onDownload: PropTypes.func.isRequired,
  onSendEmail: PropTypes.func.isRequired,
};

export default FormControls;
