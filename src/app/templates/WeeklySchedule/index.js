import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import HtmlHead from '../reusables/HtmlHead';
import ScheduleHeader from '../reusables/ScheduleHeader';
import ScheduleNotes from '../reusables/ScheduleNotes';
import DaySchedule from './DaySchedule';
import WeeklyTable from './WeeklyTable';

const WeeklySchedule = ({ dailyCodes, daySchedules, pageTitle, subTitle, title, userInfo, weekdays }) => (
  <html>
    <HtmlHead pageTitle={pageTitle} />
    <body className="mx-auto my-2 my-sm-4 px-2 px-sm-4">
      <div className="container-fluid px-0 schedules-container">
        <ScheduleHeader subTitle={subTitle} title={title} userInfo={userInfo} />
        <WeeklyTable dailyCodes={dailyCodes} weekdays={weekdays} />
        {_.map(daySchedules, ({ exercises, title: dayTitle }) => (
          <DaySchedule exercises={exercises} title={dayTitle} />
        ))}
        <ScheduleNotes />
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
  pageTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeeklySchedule;
