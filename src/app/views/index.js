import Preact from 'preact';
import Router from 'preact-router';

// Locals
import Home from './pages/Home';
import Schedules from './pages/Schedules';

import { GlobalData } from './contexts';

export default class App extends Preact.Component {
  state = {
    globalData: {},
    updateGlobalData: this.onUpdateGlobalData,
  };

  onUpdateGlobalData = partial => this.setState(({ globalData }) => ({ ...globalData, ...partial }));

  onRouteChange = event => {
    console.debug(event);
  };

  render() {
    return (
      <GlobalData.Provider value={this.state}>
        <Router onChange={this.onRouteChange}>
          <Home default />
          <Schedules path="/schedules" />
        </Router>
      </GlobalData.Provider>
    );
  }
}
