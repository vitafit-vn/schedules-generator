import Router from 'preact-router';

// Locals
import Home from './pages/Home';
import Schedules from './pages/Schedules';

const App = () => (
  <Router>
    <Home path="/" />
    <Schedules path="/schedules" />
  </Router>
);

export default App;
