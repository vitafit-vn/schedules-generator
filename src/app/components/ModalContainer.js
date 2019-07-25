import PropTypes from 'prop-types';

// Components
import TextButton from './TextButton';

const ModalContainer = ({ children, forwardRef, id, renderPrimaryButton, title }) => (
  <div className="modal fade" id={id} role="dialog" ref={forwardRef} tabIndex="-1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {renderPrimaryButton != null && renderPrimaryButton()}
          <TextButton background="danger" data-dismiss="modal" label="Đóng" />
        </div>
      </div>
    </div>
  </div>
);

ModalContainer.propTypes = {
  children: PropTypes.any.isRequired,
  forwardRef: PropTypes.func,
  id: PropTypes.string.isRequired,
  renderPrimaryButton: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default ModalContainer;
