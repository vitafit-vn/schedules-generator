import Preact from 'preact';

// Reusables
import NavBar from 'app/views/reusables/NavBar';

import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import CustomerInfo from './CustomerInfo';

export default class Schedules extends Preact.Component {
  state = {
    customerInfo: {
      birthYear: '1997',
      customerId: 'KH0001',
      height: '154',
      name: 'Chị Bảo',
      weekVariant: 'second_half',
      weeklyCode: 'WS09',
      weight: '54',
      workoutLevel: 'beginner',
      weekPeriod: '2019-W30',
    },
    personalizedData: {
      bulkRecommendedWeight: '3 - 4',
      bulkRest: '30 - 45',
      bulkRpe: '8',
      recommendedWeight: [],
      rest: [],
      rpe: [],
    },
  };

  onUpdateCustomerInfo = partial => this.setState(({ customerInfo }) => ({ ...customerInfo, ...partial }));

  onUpdatePersonalizedData = partial => this.setState(({ personalizedData }) => ({ ...personalizedData, ...partial }));

  onDownload = () => {};

  onSubmit = event => {
    event.preventDefault();
    console.debug(this.state);
  };

  render() {
    const { customerInfo, personalizedData } = this.state;

    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onSubmit}>
            <div className="row">
              <CustomerInfo data={customerInfo} onUpdate={this.onUpdateCustomerInfo} />
              <PersonalizedTable
                customerInfo={customerInfo}
                data={personalizedData}
                onUpdate={this.onUpdatePersonalizedData}
              />
            </div>
            <FormControls onDownload={this.onDownload} />
          </form>
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </div>
    );
  }
}
