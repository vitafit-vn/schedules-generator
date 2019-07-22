import PropTypes from 'prop-types';

const ScheduleHeader = ({ site, subTitle, title, userInfo }) => (
  <div>
    <div className="text-center">
      <a href={site.publicPath} rel="noopener noreferrer" target="_blank">
        <img height="100" src={`${site.publicPath}/images/logo.png`} />
      </a>
    </div>
    <div className="mt-3">
      <h4 className="font-weight-bolder text-center text-wrap text-uppercase">{title}</h4>
      <h6 className="font-italic text-center text-wrap">{subTitle}</h6>
      <div className="mt-3 row">
        <div className="ml-auto">
          <div>
            {'Khách hàng: '}
            <strong>{userInfo.name}</strong>
          </div>
          <div>
            {'Tuổi: '}
            <strong>{userInfo.age}</strong>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="mr-auto text-right">
          <div>
            {'Chiều cao: '}
            <strong>{userInfo.height} cm</strong>
          </div>
          <div>
            {'Cân nặng: '}
            <strong>{userInfo.weigh} kg</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ScheduleHeader.propTypes = {
  site: PropTypes.shape({
    publicPath: PropTypes.string.isRequired,
  }).isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    age: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    weigh: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ScheduleHeader;
