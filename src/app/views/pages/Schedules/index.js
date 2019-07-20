import Preact from 'preact';

// Locals
import { SchedulesInput } from 'app/views/contexts';
import NavBar from 'app/views/reusables/NavBar';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';

export default class Schedules extends Preact.Component {
  render() {
    return (
      <SchedulesInput.Provider>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" id="schedules-form">
            <div className="row">
              <CustomerInfo />
              <PersonalizedTable />
            </div>
            <FormControls />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </SchedulesInput.Provider>
    );
  }
}
