import _ from 'lodash';
import Preact from 'preact';
import PropTypes from 'prop-types';

// Constants
import { DAILY_SCHEDULES, EXERCISES_DATABASE, WEEKLY_SCHEDULES } from 'app/constants';

// Locals
import DataInput from './DataInput';
import HeadCell from './HeadCell';

export default class PersonalizedTable extends Preact.Component {
  static propTypes = {
    customerInfo: PropTypes.shape({
      weekVariant: PropTypes.string,
      weeklyCode: PropTypes.string,
      workoutLevel: PropTypes.string,
    }).isRequired,
    data: PropTypes.shape({
      bulkRecommendedWeight: PropTypes.string,
      bulkRest: PropTypes.string,
      bulkRpe: PropTypes.string,
      recommendedWeight: PropTypes.arrayOf(PropTypes.string),
      rest: PropTypes.arrayOf(PropTypes.string),
      rpe: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  get bodyRows() {
    const { weeklyCode, weekVariant, workoutLevel } = this.props.customerInfo;
    if (_.isEmpty(weeklyCode) || _.isEmpty(weekVariant) || _.isEmpty(workoutLevel)) return;

    const weeklyData = _.find(WEEKLY_SCHEDULES, { code: weeklyCode, variant: weekVariant });
    const { dailyCodes } = weeklyData;

    const exerciseCodes = _.flatMap(dailyCodes, codes => {
      const dayExercises = _.filter(_.union(DAILY_SCHEDULES[workoutLevel], DAILY_SCHEDULES.shared), ({ code }) =>
        _.includes(codes, code)
      );

      return _.flatMap(dayExercises, ({ exercises }) => _.map(exercises, 'code'));
    });

    return _.map(_.uniq(exerciseCodes), code => {
      const exercise = _.find(EXERCISES_DATABASE, { code });
      const { name } = exercise;
      return { code, name };
    });
  }

  onClearAll = () => {};

  onCloneAll = () => {};

  onInputChange = (key, index) => event => {
    const { value } = event.target;

    if (index == null) {
      this.props.onUpdate({ [key]: value });
      return;
    }

    const { [key]: currentBundle } = this.props.data;
    const updatedBundle = [..._.slice(currentBundle, 0, index), value, _.slice(currentBundle, index + 1)];
    this.props.onUpdate({ [key]: updatedBundle });
  };

  renderHead = () => {
    const { bulkRpe, bulkRest, bulkRecommendedWeight } = this.props.data;

    return (
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
          <DataInput name="bulk_rpe" onChange={this.onInputChange('bulkRpe')} prefix="RPE-" value={bulkRpe} />
          <DataInput name="bulk_rest" onChange={this.onInputChange('bulkRest')} suffix="s" value={bulkRest} />
          <DataInput
            name="bulk_recommended_weight"
            onChange={this.onInputChange('bulkRecommendedWeight')}
            suffix="kg"
            value={bulkRecommendedWeight}
          />
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
  };

  renderBodyRow = ({ code, name }, index) => (
    <tr data-code={code}>
      <th className="align-middle" data-code={code} scope="row">
        {code}
      </th>
      <td className="align-middle">{name}</td>
      <DataInput name="rpe" onChange={this.onInputChange('rpe', index)} prefix="RPE-" />
      <DataInput name="rest" onChange={this.onInputChange('rest', index)} suffix="s" />
      <DataInput name="recommended_weight" onChange={this.onInputChange('recommendedWeight', index)} suffix="kg" />
      <td className="align-middle">
        <button className="btn px-1" onClick={this.onClearRow} type="button">
          <i className="fa fa-trash text-danger" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );

  render() {
    return (
      <div className="col table-responsive" id="personalized-table">
        <table className="table table-borderless table-hover table-sm table-striped">
          {this.renderHead()}
          <tbody>{_.map(this.bodyRows, this.renderBodyRow)}</tbody>
        </table>
      </div>
    );
  }
}
