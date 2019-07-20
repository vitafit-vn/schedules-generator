import Preact from 'preact';

// Contexts
import { SchedulesInput } from 'app/views/contexts';

// Reusables
import NavBar from 'app/views/reusables/NavBar';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';

export default class Schedules extends Preact.Component {
  state = {
    customerInfo: {
      birthYear: undefined,
      customerId: 'KH0001',
      height: undefined,
      name: undefined,
      weekVariant: undefined,
      weeklyCode: undefined,
      weight: undefined,
      workoutLevel: undefined,
    },
    personalizedData: {},
    updateCustomerInfo: this.onUpdateCustomerInfo,
    updatePersonalizedData: this.onUpdatePersonalizedData,
  };

  onUpdateCustomerInfo = customerInfo => this.setState({ customerInfo });

  onUpdatePersonalizedData = personalizedData => this.setState({ personalizedData });

  onDownload = () => {};

  onSubmit = event => {
    event.preventDefault();
    // const url = new URL(event.target.action);
    // console.debug('onSubmit', qs.parse(_.replace(url.search, /^\?/, '')));
  };

  render() {
    return (
      <SchedulesInput.Provider value={this.state}>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onSubmit}>
            {/* <div className="row">
              <CustomerInfo />
              <PersonalizedTable />
            </div> */}
            <SchedulesInput.Consumer>
              {({ customerInfo, personalizedData, updateCustomerInfo, updatePersonalizedData }) => (
                <div className="row">
                  <CustomerInfo data={customerInfo} onUpdate={updateCustomerInfo} />
                  <PersonalizedTable data={personalizedData} onUpdate={updatePersonalizedData} />
                </div>
              )}
            </SchedulesInput.Consumer>
            <FormControls onDownload={this.onDownload} />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </SchedulesInput.Provider>
    );
  }
}
