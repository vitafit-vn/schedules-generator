import Preact from 'preact';

// Locals
import Home from './Home';

export function renderHomePage() {
  Preact.render(<Home />, document.body);
}
