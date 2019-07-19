import _ from 'lodash';
import PropTypes from 'prop-types';

// Constants
import { PAGES_CONFIG } from '../constants';

const NavBar = ({ page }) => (
  <nav className="bg-dark mb-3 navbar navbar-dark navbar-expand">
    <div className="container">
      <a className="navbar-brand" href="https://vitafit.vn">
        <img height={50} src="/images/logo.png" />
      </a>
      <ul className="navbar-nav mr-auto">
        {_.map(PAGES_CONFIG, ({ label, key, path }) => (
          <li className={`nav-item ${key === page ? 'active' : ''}`}>
            <a className="nav-link" href={path}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  </nav>
);

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NavBar;
