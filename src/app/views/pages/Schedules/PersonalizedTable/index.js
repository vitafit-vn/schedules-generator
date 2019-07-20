import Preact from 'preact';

// Locals
import DataInput from './DataInput';
import HeadCell from './HeadCell';

export default class PersonalizedTable extends Preact.Component {
  state = {
    bulkRpe: undefined,
    bulkRest: undefined,
    bulkRecommendedWeight: undefined,
  };

  onClearAll = () => {};

  onCloneAll = () => {};

  onChangeBulkRpe = event => this.setState({ bulkRpe: event.target.value });

  onChangeBulkRest = event => this.setState({ bulkRest: event.target.value });

  onChangeBulkRecommendedWeight = event => this.setState({ bulkRecommendedWeight: event.target.value });

  renderHead = () => (
    <thead className="thead-dark">
      <tr>
        <HeadCell label="Mã" />
        <HeadCell label="Bài tập" />
        <HeadCell label="Mức tạ" />
        <HeadCell label="Thời gian nghỉ" />
        <HeadCell label="Khối lượng khuyến nghị" />
        <HeadCell />
      </tr>
      <tr>
        <td></td>
        <td></td>
        <DataInput name="bulk_rpe" onChange={this.onChangeBulkRpe} prefix="RPE-" />
        <DataInput name="bulk_rest" onChange={this.onChangeBulkRest} suffix="s" />
        <DataInput name="bulk_recommended_weight" onChange={this.onChangeBulkRecommendedWeight} suffix="kg" />
        <td className="align-middle">
          <div className="d-flex">
            <button className="btn px-1" onClick={this.onClearAll} type="button">
              <i className="fa fa-trash text-danger" aria-hidden="true"></i>
            </button>
            <button className="btn px-1" onClick={this.onCloneAll} type="button">
              <i className="fa fa-clone text-primary" aria-hidden="true"></i>
            </button>
          </div>
        </td>
      </tr>
    </thead>
  );

  render() {
    return (
      <div className="col table-responsive" id="personalized-table">
        <table className="mt-3 table table-borderless table-hover table-sm table-striped">
          {this.renderHead()}
          <tbody></tbody>
        </table>
      </div>
    );
  }
}
