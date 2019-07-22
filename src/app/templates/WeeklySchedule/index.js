import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import HtmlHead from '../reusables/HtmlHead';
import ScheduleHeader from '../reusables/ScheduleHeader';
import DaySchedule from './DaySchedule';
import WeeklyTable from './WeeklyTable';

const WeeklySchedule = ({ dailyCodes, daySchedules, site, subTitle, title, userInfo, weekdays }) => (
  <html>
    <HtmlHead site={site} />
    <body className="mx-auto my-2 my-sm-4 px-2 px-sm-4">
      <div className="container-fluid schedules-container">
        <ScheduleHeader site={site} subTitle={subTitle} title={title} userInfo={userInfo} />
        <WeeklyTable dailyCodes={dailyCodes} weekdays={weekdays} />
        {_.map(daySchedules, ({ exercises, title: dayTitle }) => (
          <DaySchedule exercises={exercises} title={dayTitle} />
        ))}
      </div>
    </body>
  </html>
);

WeeklySchedule.propTypes = {
  dailyCodes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  daySchedules: PropTypes.arrayOf(
    PropTypes.shape({
      exercises: PropTypes.arrayOf(PropTypes.object),
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  site: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    publicPath: PropTypes.string.isRequired,
  }).isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeeklySchedule;
