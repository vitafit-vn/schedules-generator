import { Component } from 'preact';
import Router from 'preact-router';

// Locals
import { GlobalDataContext } from '../contexts';

import Home from './Home';
import Schedules from './Schedules';
import PlaceholderPage from './PlaceholderPage';

export default class App extends Component {
  state = {
    updateUser: this.onUpdateUser,
    user: undefined,
  };

  onUpdateUser = user => this.setState({ user });

  onRouteChange = event => {
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
