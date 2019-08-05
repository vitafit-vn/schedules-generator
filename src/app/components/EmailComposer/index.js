import { Component } from 'preact';
import PropTypes from 'prop-types';

// Components
import Alert from '../Alert';
import FormInput from '../FormInput';
import ModalContainer from '../ModalContainer';
import TextButton from '../TextButton';

// Locals
import { DEFAULT_STATE, INPUT_IDS, INPUT_CONFIGS, buildAlertMessage, normalizeInputValue } from './primitives';

export default class EmailComposer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    onSendEmail: PropTypes.func.isRequired,
    overridenData: PropTypes.object,
    renderExtraFields: PropTypes.func,
  };

  state = DEFAULT_STATE;

  componentDidMount() {
    window.$('#email-composer-modal').on('hide.bs.modal', this.onModalHidden);
    window.$('#email-composer-alert').on('closed.bs.alert', () => this.setState({ alertMessage: undefined }));
  }

  componentWillReceiveProps(nextProps) {
    const { overridenData } = nextProps;
    if (overridenData !== this.state.overridenData) this.setState(overridenData);
  }

  onModalHidden = () => this.setState(DEFAULT_STATE); // Clear state

  onInputChange = key => event => {
    const value = normalizeInputValue(key, event.target.value);
    this.setState({ [key]: value, alertMessage: undefined });
  };

  onSubmitEmail = async event => {
    event.preventDefault();
    if (!window.$('#email-composer-form')[0].reportValidity()) return;

    try {
      this.setState({ loading: true });
      await this.props.onSendEmail(this.state);
      this.setState({ alertMessage: buildAlertMessage(undefined, 'Gửi email thành công!'), loading: false });
    } catch (error) {
      console.warn({ ...error });
      this.setState({ alertMessage: buildAlertMessage(error), loading: false });
    }
  };

  renderAlert = () => {
    const { alertMessage } = this.state;
    if (alertMessage == null) return null;

    const { message, type } = alertMessage;

    return (
      <Alert id="email-composer-alert" type={type}>
        {message}
      </Alert>
    );
  };

  renderInput = id => {
    const { [id]: value } = this.state;
    const { [id]: props } = INPUT_CONFIGS;
    const passedProps = {
      ...props,
      value,
      id: `email-composer-${id}`,
      inline: true,
      inlineLabelClass: 'col-2 pr-0',
      onChange: this.onInputChange(id),
    };

    return <FormInput {...passedProps} />;
  };

  renderSendButton = () => (
    <TextButton icon="paper-plane" label="Gửi" loading={this.state.loading} onClick={this.onSubmitEmail} />
  );

  render() {
    const { children, renderExtraFields } = this.props;

    return (
      <ModalContainer id="email-composer-modal" renderPrimaryButton={this.renderSendButton} title="Gửi email lịch tập">
        <form action="#" id="email-composer-form">
          {this.renderAlert()}
          {this.renderInput(INPUT_IDS.TO_ADDRESSES)}
          {this.renderInput(INPUT_IDS.CC_ADDRESSES)}
          {this.renderInput(INPUT_IDS.BCC_ADDRESSES)}
          {this.renderInput(INPUT_IDS.SUBJECT)}
          {renderExtraFields != null && renderExtraFields()}
        </form>
        {children}
      </ModalContainer>
    );
  }
}
