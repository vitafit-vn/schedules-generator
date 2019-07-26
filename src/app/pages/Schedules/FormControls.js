import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const FormControls = ({ onComposeEmail, onDownload }) => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-auto">
        <TextButton icon="file-text" label="Xem trước" type="submit" />
      </div>
      <div className="col-auto">
        {/* data-target="#email-composer-modal" data-toggle="modal"  */}
        <TextButton icon="paper-plane" label="Gửi email" onClick={onComposeEmail} />
      </div>
      <div className="col-auto">
        <TextButton icon="download" label="Tải file HTML" onClick={onDownload} />
      </div>
    </div>
  );
};

FormControls.propTypes = {
  onComposeEmail: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FormControls;
