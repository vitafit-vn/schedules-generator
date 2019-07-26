import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const FormControls = ({ onComposeEmail, onCreatePermalink, onDownload }) => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-auto">
        <TextButton icon="file-text" label="Xem trước" type="submit" />
      </div>
      <div className="col-auto">
        <TextButton icon="clipboard" label="Permalink" onClick={onCreatePermalink} />
      </div>
      <div className="col-auto">
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
  onCreatePermalink: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FormControls;
