import PropTypes from 'prop-types';

const UserInfo = ({ userInfo }) => (
  <div>
    <h5 className="bg-secondary">{'II. Thông tin khách hàng'}</h5>
    <table>
      <tbody>
        <tr>
          <td>{'Tên khách hàng'}</td>
          <td>{userInfo.fullName}</td>
        </tr>
        <tr>
          <td>{'Độ tuổi'}</td>
          <td>{userInfo.age}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

UserInfo.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default UserInfo;
