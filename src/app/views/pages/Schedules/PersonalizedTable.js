const PersonalizedTable = () => (
  <div className="col table-responsive" id="personalized-table">
    <table className="mt-3 table table-borderless table-hover table-sm table-striped">
      <thead className="thead-dark">
        <tr>
          <th className="align-middle" scope="col">
            {'Mã'}
          </th>
          <th className="align-middle" scope="col">
            {'Bài tập'}
          </th>
          <th className="align-middle" scope="col">
            {'Mức tạ'}
          </th>
          <th className="align-middle" scope="col">
            {'Thời gian nghỉ'}
          </th>
          <th className="align-middle" scope="col">
            {'Khối lượng<br />khuyến nghị'}
          </th>
          <th className="align-middle" scope="col"></th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td className="align-middle">
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">RPE-</span>
              </div>
              <input className="form-control" name="bulk_rpe" type="text" />
            </div>
          </td>
          <td className="align-middle">
            <div className="input-group input-group-sm">
              <input className="form-control" name="bulk_rest" type="text" />
              <div className="input-group-append">
                <span className="input-group-text">s</span>
              </div>
            </div>
          </td>
          <td className="align-middle">
            <div className="input-group input-group-sm">
              <input className="form-control" name="bulk_recommended_weight" type="text" />
              <div className="input-group-append">
                <span className="input-group-text">kg</span>
              </div>
            </div>
          </td>
          <td className="align-middle">
            <div className="d-flex">
              <button className="btn px-1" id="clear-personalized-data" type="button">
                <i className="fa fa-trash text-danger" aria-hidden="true"></i>
              </button>
              <button className="btn px-1" id="clone-personalized-data" type="button">
                <i className="fa fa-clone text-primary" aria-hidden="true"></i>
              </button>
            </div>
          </td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
);

export default PersonalizedTable;
