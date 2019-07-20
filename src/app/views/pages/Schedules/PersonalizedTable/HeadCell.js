import fp from 'lodash/fp';
import PropTypes from 'prop-types';

const HeadCell = ({ label }) => {
  const lines = fp.flow(
    fp.split('\\n'),
    fp.compact,
    fp.map(text => <div>{text}</div>)
  )(label);

  return (
    <th className="align-middle" scope="col">
      {lines}
    </th>
  );
};

HeadCell.propTypes = {
  label: PropTypes.string,
};

export default HeadCell;
