import PropTypes from 'prop-types';

const HeadCell = ({ label }) => (
  <th className="align-middle text-wrap" scope="col">
    {label}
  </th>
);

HeadCell.propTypes = {
  label: PropTypes.string,
};

export default HeadCell;
