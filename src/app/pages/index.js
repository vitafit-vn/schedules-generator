import { Component } from 'preact';
import Router from 'preact-router';

// Locals
import { GlobalDataContext } from '../contexts';

import Home from './Home';
import Schedules from './Schedules';

export default class App extends Component {
  state = {
    globalData: {},
    updateGlobalData: this.onUpdateGlobalData,
  };

  onUpdateGlobalData = partial => this.setState(({ globalData }) => ({ ...globalData, ...partial }));

  onRouteChange = event => {
    console.debug(event); // eslint-disable-line
  };

  render() {
    return (
      <GlobalDataContext.Provider value={this.state}>
        <Router onChange={this.onRouteChange}>
          <Home default />
          <Schedules path="/schedules" />
        </Router>
      </GlobalDataContext.Provider>
    );
  }
}
