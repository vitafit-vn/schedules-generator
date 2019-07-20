import Preact from 'preact';

// Locals
import { SchedulesInput } from 'app/views/contexts';
import NavBar from 'app/views/reusables/NavBar';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';

export default class Schedules extends Preact.Component {
  onDownload = () => {};

  onSubmit = event => {
    console.debug('onSubmit', event);
    event.preventDefault();
  };

  render() {
    return (
      <SchedulesInput.Provider>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onSubmit}>
            <div className="row">
              <CustomerInfo />
              <PersonalizedTable />
            </div>
            <FormControls onDownload={this.onDownload} />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </SchedulesInput.Provider>
    );
  }
}
