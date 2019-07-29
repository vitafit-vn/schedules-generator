import PropTypes from 'prop-types';

// Components
import TextButton from 'app/components/TextButton';

const ControlsDropdown = ({ onComposeEmail, onCreatePermalink, onDownload }) => {
  const itemClass = 'align-items-center d-flex dropdown-item justify-content-between';

  return (
    <div className="col-auto dropdown">
      <button
        aria-expanded="false"
        aria-haspopup="true"
        className="btn btn-primary dropdown-toggle"
        data-toggle="dropdown"
        id="footer-form-dropdown"
        type="button"
      >
        {'Lựa chọn'}
      </button>
      <div className="dropdown-menu" aria-labelledby="footer-form-dropdown">
        <TextButton className={itemClass} color="dark" icon="file-text" label="Xem trước" type="submit" />
        <TextButton className={itemClass} color="dark" icon="clipboard" label="Permalink" onClick={onCreatePermalink} />
        <TextButton className={itemClass} color="dark" icon="paper-plane" label="Gửi email" onClick={onComposeEmail} />
        <TextButton className={itemClass} color="dark" icon="download" label="Tải file HTML" onClick={onDownload} />
      </div>
    </div>
  );
};

ControlsDropdown.propTypes = {
  onComposeEmail: PropTypes.func.isRequired,
  onCreatePermalink: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

const FooterFormControls = ({ dropdown, onComposeEmail, onCreatePermalink, onDownload }) => {
  if (dropdown) {
    return (
      <div className="row">
        <div className="col"></div>
        <ControlsDropdown
          onComposeEmail={onComposeEmail}
          onCreatePermalink={onCreatePermalink}
          onDownload={onDownload}
        />
      </div>
    );
  }

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

FooterFormControls.propTypes = {
  ...ControlsDropdown.propTypes,
  dropdown: PropTypes.bool,
};

FooterFormControls.defaultProps = {
  dropdown: false,
};

export default FooterFormControls;
