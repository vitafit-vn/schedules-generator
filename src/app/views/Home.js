import Preact from 'preact';

export default class Home extends Preact.Component {
  render() {
    return (
      <div>
        <nav className="bg-dark mb-3 navbar navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="https://vitafit.vn">
              <img height={50} src="/images/logo.png" />
            </a>
            <h5 className="mb-0 text-light">Công cụ Vận hành</h5>
          </div>
        </nav>
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
