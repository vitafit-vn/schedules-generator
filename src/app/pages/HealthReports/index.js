import clipboardCopy from 'clipboard-copy';
// import _ from 'lodash';
import { Component } from 'preact';

// Template renderers
import { renderSchedulesHTML } from 'app/templates';

// Reusables
import { FooterFormControls, NavBar } from 'app/components';

// Utils
import { buildPermalink, parsePermalink } from 'app/utils';

// Locals
import CustomerInfo from './CustomerInfo';
import defaultState from './defaultState';

export default class HealthReports extends Component {
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

    const { allSchedules } = renderSchedulesHTML(this.state);
    this.setState({ allSchedules });
  };

  render() {
    const { customerInfo } = this.state;

    return (
      <div>
        <NavBar page="health_reports" />
        <div className="container px-0">
          <h3 className="mb-3 text-primary">{'Công cụ Báo cáo chỉ số sức khoẻ khách hàng'}</h3>
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
