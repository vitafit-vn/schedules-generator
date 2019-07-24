import PropTypes from 'prop-types';

// Locals
import HtmlHead from '../reusables/HtmlHead';
import ScheduleHeader from '../reusables/ScheduleHeader';
import ScheduleNotes from '../reusables/ScheduleNotes';
import DailyExercise from './DailyExercise';

const DailySchedule = ({ dailyExercises, site, subTitle, title, userInfo }) => {
  const { exercises, title: dayTitle } = dailyExercises;

  return (
    <html>
      <HtmlHead site={site} />
      <body className="mx-auto my-2 my-sm-4 px-2 px-sm-4">
        <div className="container-fluid schedules-container">
          <ScheduleHeader site={site} subTitle={subTitle} title={title} userInfo={userInfo} />
          <DailyExercise exercises={exercises} title={dayTitle} />
          <ScheduleNotes />
        </div>
      </body>
    </html>
  );
};

DailySchedule.propTypes = {
  dailyCodes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  dailyExercises: PropTypes.shape({
    exercises: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    publicPath: PropTypes.string.isRequired,
  }).isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DailySchedule;
