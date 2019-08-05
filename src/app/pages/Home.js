import { Component } from 'preact';
import PropTypes from 'prop-types';

// Locals
import { NavBar } from 'app/components';

export default class Home extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <NavBar currentPath={this.props.path} />
      </div>
    );
  }
}
