import _ from 'lodash';
import PropTypes from 'prop-types';

const renderRow = ([weekday, codes], idx) => {
  const borderClass = idx > 0 ? 'border-top-0' : '';

  return (
    <div className="row text-center">
      <div className="align-items-center bg-primary col-4 d-flex font-weight-bold justify-content-center text-white">
        {weekday}
      </div>
      <div className={`align-items-center border border-primary ${borderClass} col d-flex justify-content-center`}>
        {codes.join(', ')}
      </div>
    </div>
  );
};

const WeeklyTable = ({ dailyCodes, weekdays }) => {
  const rows = _.zip(weekdays, dailyCodes);
  return <div className="container my-3">{_.map(rows, renderRow)}</div>;
};

WeeklyTable.propTypes = {
  dailyCodes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeeklyTable;
