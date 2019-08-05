import clipboardCopy from 'clipboard-copy';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Template renderers
import { renderSchedulesHTML } from 'app/templates';

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

  onRenderReportsHTML = () => renderSchedulesHTML(this.state);

  onCreatePermalink = () => {
    const { customerInfo, personalizedData } = this.state;
    const permalink = buildPermalink('health_reports', { customerInfo, personalizedData });
    clipboardCopy(permalink);
  };

  onOpenEmailComposer = () => {
    if (!this.formValid) return;
    window.$('#email-composer-modal').modal('show');
  };

  onPreviewSchedules = event => {
    event.preventDefault();
    if (!this.formValid) return;

    const calc = new Calc(this.state.customerInfo);
    console.debug(calc);
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
            <div className="col-6 mx-auto" id="health-reports-preview"></div>
          </div>
          {/* <EmailComposer customerInfo={customerInfo} onRenderHTML={this.onRenderReportsHTML} /> */}
        </div>
      </div>
    );
  }
}
