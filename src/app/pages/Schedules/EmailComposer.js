import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import ModalContainer from 'app/components/ModalContainer';
import TextButton from 'app/components/TextButton';

export default class EmailComposer extends Component {
  static propTypes = {
    onRenderSchedulesHTML: PropTypes.func.isRequired,
    onSendEmail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.$('#email-composer-modal').on('show.bs.modal', this.handleModalEvent);
    window.$('#email-composer-modal').on('hide.bs.modal', this.handleModalEvent);
  }

  handleModalEvent = event => console.debug(event);

  renderSendButton = () => <TextButton label="Gửi" onClick={this.props.onSendEmail} />;

  render() {
    return (
      <ModalContainer id="email-composer-modal" renderPrimaryButton={this.renderSendButton} title="Gửi email lịch tập">
        <p>{'Modal body text goes here.'}</p>
      </ModalContainer>
    );
  }
}
