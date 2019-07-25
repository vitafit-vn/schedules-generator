import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const FormControls = ({ onDownload, onEmail }) => (
  <div className="row">
    <div className="col"></div>
    <div className="col-auto">
      <TextButton icon="file-text" label="Xem trước" type="submit" />
    </div>
    <div className="col-auto">
      <TextButton icon="paper-plane" label="Gửi email" onClick={onEmail} />
    </div>
    <div className="col-auto">
      <TextButton icon="download" label="Tải file HTML" onClick={onDownload} />
    </div>
  </div>
);

FormControls.propTypes = {
  onDownload: PropTypes.func.isRequired,
  onEmail: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

export default FormControls;
