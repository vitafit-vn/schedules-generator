import { Component } from 'preact';
import { Router, route } from 'preact-router';

// Locals
import { GlobalDataContext } from '../contexts';

import Home from './Home';
import LT16 from './LT16';
import PlaceholderPage from './PlaceholderPage';
import Schedules from './Schedules';

export default class App extends Component {
  state = {
    updateUser: this.onUpdateUser,
    user: {},
  };

  onUpdateUser = user => this.setState({ user });

  onRouteChange = async event => {
    if (this.state.user == null) {
      route('/', true);
      return;
    }

    console.debug(event); // eslint-disable-line
  };

  render() {
    return (
      <GlobalDataContext.Provider value={this.state}>
        <Router onChange={this.onRouteChange}>
          <Home default />
          <Schedules path="/schedules" />
          <PlaceholderPage path="/meals" />
          <LT16 path="/lt16" />
          <PlaceholderPage path="/health_reports" />
        </Router>
      </GlobalDataContext.Provider>
    );
  }
}
