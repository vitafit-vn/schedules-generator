import clipboardCopy from 'clipboard-copy';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Template renderers
import { renderLT16Report } from 'app/templates';

// Reusables
import { FooterFormControls, NavBar } from 'app/components';

// Utils
import { Calc, buildPermalink, parsePermalink } from 'app/utils';

// Locals
import CustomerInfo from './CustomerInfo';
import defaultState from './defaultState';

export default class LT16 extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  state = {
    ...defaultState,
    ...parsePermalink(),
  };

  get formValid() {
    return this.healthReportsForm.reportValidity();
  }

  onUpdateCustomerInfo = partial =>
    this.setState(({ customerInfo }) => ({ customerInfo: { ...customerInfo, ...partial } }));

  onFormRef = ref => (this.healthReportsForm = ref); // eslint-disable-line no-return-assign

  onRenderReports = () => renderLT16Report(this.state);

  onCreatePermalink = () => {
    const { customerInfo } = this.state;
    const permalink = buildPermalink('lt16', { customerInfo });
    clipboardCopy(permalink);
  };

  onOpenEmailComposer = () => {
    if (!this.formValid) return;
    window.$('#email-composer-modal').modal('show');
  };

  onPreviewSchedules = event => {
    event.preventDefault();
    if (!this.formValid) return;

    const { customerInfo } = this.state;
    const { computedValues } = new Calc(customerInfo);
    console.debug({ computedValues, customerInfo });
  };

  render() {
    const { customerInfo } = this.state;

    return (
      <div>
        <NavBar currentPath={this.props.path} />
        <div className="container px-0">
          <h3 className="mb-3 text-primary">{'Công cụ tạo lộ trình LT16'}</h3>
          <div className="mb-3 row">
            <div className="col-4">
              <form action="#" onSubmit={this.onPreviewSchedules} ref={this.onFormRef}>
                <CustomerInfo data={customerInfo} onUpdate={this.onUpdateCustomerInfo} />
                <FooterFormControls
                  dropdown
                  onComposeEmail={this.onOpenEmailComposer}
                  onCreatePermalink={this.onCreatePermalink}
                  onDownload={this.onDownloadSchedules}
                />
              </form>
            </div>
            <div className="col-6 mx-auto" id="lt16-preview"></div>
          </div>
          {/* <EmailComposer customerInfo={customerInfo} onRenderHTML={this.onRenderReports} /> */}
        </div>
      </div>
    );
  }
}
