import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import CompanyBrand from './CompanyBrand';

const ScheduleHeader = ({ subTitle, title, userInfo }) => {
  const { age, height, fullName, weight } = userInfo;

  const rows = [
    { label: 'Khách hàng', value: fullName },
    { label: 'Tuổi', value: age },
    { label: 'Chiều cao', value: `${height}cm` },
    { label: 'Cân nặng', value: `${weight}kg` },
  ];

  return (
    <div className="text-center text-wrap">
      <CompanyBrand />
      <div className="mt-5">
        <h4 className="font-weight-bolder text-uppercase">{title}</h4>
        <h6 className="font-italic">{subTitle}</h6>
        <ul className="m-0 p-0">
          {_.map(rows, ({ label, value }) => (
            <li className="list-inline-item mr-3">
              {`${label}: `}
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ScheduleHeader.propTypes = {
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    age: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
  }).isRequired,
};

export default ScheduleHeader;
