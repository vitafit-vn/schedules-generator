import Preact from 'preact';

// Locals
import NavBar from '../reusables/NavBar';

export default class Schedules extends Preact.Component {
  render() {
    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <button className="btn btn-primary d-none" id="google-auth">
            {'Đăng nhập'}
            <div
              className="d-none spinner-border spinner-border-sm text-white ml-1"
              id="loading-spinner"
              role="status"
            ></div>
          </button>
        </div>
      </div>
    );
  }
}
