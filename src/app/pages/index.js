import { Component } from 'preact';
import { Router, route } from 'preact-router';

// Locals
import { GlobalDataContext } from '../contexts';

import Home from './Home';
import Schedules from './Schedules';
import PlaceholderPage from './PlaceholderPage';

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
          <PlaceholderPage path="/lt16" />
        </Router>
      </GlobalDataContext.Provider>
    );
  }
}
