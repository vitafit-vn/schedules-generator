const UserInfo = () => (
  <div className="col-3" id="user-info">
    <div className="form-group">
      <label htmlFor="user-id">Mã KH</label>
      <input className="form-control" id="user-id" name="user_id" required type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="full-name">Họ tên</label>
      <input className="form-control" id="full-name" name="full_name" required type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="birth-year">Năm sinh</label>
      <input className="form-control" id="birth-year" max="2010" min="1950" name="birth_year" required type="number" />
    </div>
    <div className="form-group">
      <label htmlFor="height">Chiều cao</label>
      <div className="input-group">
        <input className="form-control" id="height" max="200" min="100" name="height" required type="number" />
        <div className="input-group-append">
          <span className="input-group-text">cm</span>
        </div>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="weight">Cân nặng</label>
      <div className="input-group">
        <input className="form-control" id="weight" max="100" min="30" name="weight" required type="number" />
        <div className="input-group-append">
          <span className="input-group-text">kg</span>
        </div>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="workout-level">Trình độ</label>
      <select className="custom-select" id="workout-level" name="workout_level" required></select>
    </div>
    <div className="form-group">
      <label htmlFor="weekly-code">Preset lịch tuần</label>
      <select className="custom-select" id="weekly-code" name="weekly_code" required></select>
    </div>
    <div className="form-group">
      <label htmlFor="week-variant">Biến thể tuần</label>
      <select className="custom-select" id="week-variant" name="week_variant" required></select>
    </div>
    <div className="form-group">
      <label htmlFor="week-period">Tuần</label>
      <input className="form-control" id="week-period" name="week_period" required type="week"></input>
    </div>
  </div>
);

export default UserInfo;
