import { Component } from 'preact';

// Locals
import { NavBar } from 'app/components';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar page="home" />
        {/* <div className="container">
          <button className="btn btn-primary d-none" id="google-auth">
            {'Đăng nhập'}
            <div
              className="d-none spinner-border spinner-border-sm text-white ml-1"
              id="loading-spinner"
              role="status"
            ></div>
          </button>
        </div> */}
      </div>
    );
  }
}
