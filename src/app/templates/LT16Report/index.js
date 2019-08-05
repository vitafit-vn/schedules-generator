import PropTypes from 'prop-types';

// Locals
import HtmlHead from '../reusables/HtmlHead';
import ScheduleHeader from '../reusables/ScheduleHeader';
import UserInfo from './UserInfo';

const LT16Report = ({ pageTitle, subTitle, title, userInfo }) => {
  return (
    <html>
      <HtmlHead pageTitle={pageTitle} />
      <body className="mx-auto my-2 my-sm-4 px-2 px-sm-4">
        <div className="container-fluid px-0 schedules-container">
          <ScheduleHeader subTitle={subTitle} title={title} userInfo={userInfo} />
          <UserInfo userInfo={userInfo} />
        </div>
      </body>
    </html>
  );
};

LT16Report.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LT16Report;
