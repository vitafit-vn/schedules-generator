import { Component } from 'preact';
import Router from 'preact-router';

// Locals
import Home from './pages/Home';
import Schedules from './pages/Schedules';

import { GlobalDataContext } from './configs';

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
