import Preact from 'preact';

// Locals
import DataInput from './DataInput';
import HeadCell from './HeadCell';

export default class PersonalizedTable extends Preact.Component {
  renderHead = () => (
    <thead className="thead-dark">
      <tr>
        <HeadCell label="Mã" />
        <HeadCell label="Bài tập" />
        <HeadCell label="Mức tạ" />
        <HeadCell label="Thời gian nghỉ" />
        <HeadCell label="Khối lượng\nkhuyến nghị" />
        <HeadCell />
      </tr>
      <tr>
        <td></td>
        <td></td>
        <DataInput name="bulk_rpe" prefix="RPE-" />
        <DataInput name="bulk_rest" suffix="s" />
        <DataInput name="bulk_recommended_weight" suffix="kg" />
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
