const FormControls = () => (
  <div className="row">
    <div className="align-items-center justify-content-end col d-flex">
      <div className="d-none spinner-border text-primary" id="loading-spinner" role="status"></div>
    </div>
    <div className="col-auto">
      <button className="btn btn-primary" type="submit">
        {'Xem lịch'}
        <i className="fa fa-file-text ml-1 text-white"></i>
      </button>
    </div>
    <div className="col-auto">
      <button className="btn btn-primary" id="download-schedules" type="button">
        {'Tải file HTML'}
        <i className="fa fa-download ml-1 text-white"></i>
      </button>
    </div>
  </div>
);

export default FormControls;
