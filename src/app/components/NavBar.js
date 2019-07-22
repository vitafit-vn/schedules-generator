import _ from 'lodash';
import { Component } from 'preact';
import PropTypes from 'prop-types';

const PAGES_CONFIG = [
  {
    key: 'home',
    label: 'Trang chủ',
    path: '/',
  },
  {
    key: 'schedules',
    label: 'Lịch tập',
    path: '/schedules',
  },
  {
    disabled: true,
    key: 'meals',
    label: 'Thực đơn',
    path: '/meals',
  },
  {
    disabled: true,
    key: 'sales',
    label: 'Sales kit',
    path: '/sales',
  },
];

export default class NavBar extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
  };

  renderNavItem = ({ label, key, path }) => {
    const { page } = this.props;
    const activeClass = key === page ? 'active' : '';

    return (
      <li className={`nav-item ${activeClass}`}>
        <a className="nav-link" href={path}>
          {label}
        </a>
      </li>
    );
  };

  render() {
    const enabledConfigs = _.reject(PAGES_CONFIG, { disabled: true });

    return (
      <nav className="bg-dark mb-3 navbar navbar-dark navbar-expand">
        <div className="container">
          <a className="navbar-brand" href="https://vitafit.vn">
            <img height={50} src="/images/logo.png" />
          </a>
          <ul className="navbar-nav mr-auto">{_.map(enabledConfigs, this.renderNavItem)}</ul>
          <div></div>
        </div>
      </nav>
    );
  }
}
