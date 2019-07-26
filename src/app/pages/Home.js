import { Component } from 'preact';

// Locals
import { NavBar, Toast } from 'app/components';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar page="home" />
        <Toast />
      </div>
    );
  }
}
