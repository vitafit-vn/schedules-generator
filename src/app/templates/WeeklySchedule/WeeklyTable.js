import _ from 'lodash';
import PropTypes from 'prop-types';

const WeeklyTable = ({ dailyCodes, weekdays }) => (
  <div className="table-responsive">
    <table className="mt-3 table table-borderless table-sm text-center text-wrap">
      <thead>
        <tr className="bg-primary border border-primary">
          {_.map(weekdays, weekday => (
            <th className="align-middle font-weight-bold text-white" scope="col">
              {weekday}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {_.map(dailyCodes, codes => (
            <td className="align-middle border border-primary">
              {_.map(codes, code => (
                <div>{code}</div>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

WeeklyTable.propTypes = {
  dailyCodes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeeklyTable;
