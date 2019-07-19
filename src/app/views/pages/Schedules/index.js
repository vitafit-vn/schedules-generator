import Preact from 'preact';

// Locals
import NavBar from '../../reusables/NavBar';
import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import UserInfo from './UserInfo';

export default class Schedules extends Preact.Component {
  render() {
    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" id="schedules-form">
            <div className="row">
              <UserInfo />
              <PersonalizedTable />
            </div>
            <FormControls />
          </form>
        </div>
      </div>
    );
  }
}
