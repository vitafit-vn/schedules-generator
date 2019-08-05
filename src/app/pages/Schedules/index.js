import clipboardCopy from 'clipboard-copy';
import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Template renderers
import { renderAllSchedules } from 'app/templates';

// Reusables
import { FooterFormControls, NavBar } from 'app/components';

// Utils
import { buildPermalink, parsePermalink, zipAndSave } from 'app/utils';

// Locals
import CustomerInfo from './CustomerInfo';
import PersonalizedTable from './PersonalizedTable';
import SchedulesAccordion from './SchedulesAccordion';
import SchedulesEmailComposer from './SchedulesEmailComposer';
import defaultState from './defaultState';

export default class Schedules extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  state = {
    ...defaultState,
    ...parsePermalink(),
    allSchedules: undefined,
  };

  get formValid() {
    return this.schedulesForm.reportValidity();
  }

  onUpdateCustomerInfo = partial => {
    const { customerInfo: currentInfo } = this.state;
    const customerInfo = { ...currentInfo, ...partial };
    this.setState({ customerInfo });
  };

  onUpdatePersonalizedData = partial => {
    const { personalizedData: currentData } = this.state;
    const personalizedData = { ...currentData, ...partial };
    this.setState({ personalizedData });
  };

  onFormRef = ref => (this.schedulesForm = ref); // eslint-disable-line no-return-assign

  onRenderSchedules = () => renderAllSchedules(this.state);

  onCreatePermalink = () => {
    const { customerInfo, personalizedData } = this.state;
    const permalink = buildPermalink('schedules', { customerInfo, personalizedData });
    clipboardCopy(permalink);
  };

  onDownloadSchedules = async () => {
    if (!this.formValid) return;

    try {
      const { allSchedules, checksum } = this.onRenderSchedules();
      const prefix = `${this.state.customerInfo.customerId}_${checksum.substring(checksum.length - 6)}`;

      const allFiles = _.map(allSchedules, ({ fileName, toHtml }) => ({
        content: toHtml(),
        fileName: `${prefix}-${fileName}.html`,
      }));

      await zipAndSave(allFiles, `${prefix}.zip`);
    } catch (error) {
      alert(error.message); // eslint-disable-line no-alert
    }
  };

  onOpenEmailComposer = () => {
    if (!this.formValid) return;
    window.$('#email-composer-modal').modal('show');
  };

  onPreviewSchedules = event => {
    event.preventDefault();
    if (!this.formValid) return;

    const { allSchedules } = this.onRenderSchedules();
    this.setState({ allSchedules });
  };

  render() {
    const { allSchedules, customerInfo, personalizedData } = this.state;

    return (
      <div>
        <NavBar currentPath={this.props.path} />
        <div className="container px-0">
          <h3 className="mb-3 text-primary">{'Công cụ Tạo lịch tập'}</h3>
          <form action="#" onSubmit={this.onPreviewSchedules} ref={this.onFormRef}>
            <div className="row">
              <CustomerInfo data={customerInfo} onUpdate={this.onUpdateCustomerInfo} />
              <PersonalizedTable
                customerInfo={customerInfo}
                data={personalizedData}
                onUpdate={this.onUpdatePersonalizedData}
              />
            </div>
            <FooterFormControls
              onComposeEmail={this.onOpenEmailComposer}
              onCreatePermalink={this.onCreatePermalink}
              onDownload={this.onDownloadSchedules}
            />
          </form>
          <SchedulesEmailComposer customerInfo={customerInfo} onRenderSchedules={this.onRenderSchedules} />
        </div>
        <div className="my-3 mx-auto" id="schedules-preview">
          <SchedulesAccordion schedules={allSchedules} />
        </div>
      </div>
    );
  }
}
