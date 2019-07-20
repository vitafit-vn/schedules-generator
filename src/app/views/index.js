import Router from 'preact-router';

// Locals
// import Home from './pages/Home';
import Schedules from './pages/Schedules';

import { UserAuth } from './contexts';

const App = () => (
  <UserAuth.Provider>
    <Router>
      <Schedules path="/" />
      <Schedules path="/schedules" />
    </Router>
  </UserAuth.Provider>
);

export default App;
