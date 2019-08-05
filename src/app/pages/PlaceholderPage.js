import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import { NavBar } from 'app/components';

const PlaceholderPage = ({ path }) => {
  const page = _.replace(path, '/', '');

  return (
    <div>
      <NavBar currentPath={path} />
      <p>{_.capitalize(page)}</p>
    </div>
  );
};

PlaceholderPage.propTypes = {
  path: PropTypes.string.isRequired,
};

export default PlaceholderPage;
