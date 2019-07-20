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
      weeklyCode: PropTypes.string,
      workoutLevel: PropTypes.string,
    }).isRequired,
    data: PropTypes.shape({
      bulkRecommendedWeight: PropTypes.string,
      bulkRest: PropTypes.string,
      bulkRpe: PropTypes.string,
      recommendedWeight: PropTypes.objectOf(PropTypes.string),
      rest: PropTypes.objectOf(PropTypes.string),
      rpe: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { bodyRows: this.buildBodyRows(this.props.customerInfo) };
  }

  componentWillReceiveProps(nextProps) {
    const { customerInfo } = nextProps;

    if (this.props.customerInfo !== customerInfo) {
      this.setState({ bodyRows: this.buildBodyRows(customerInfo) });
    }
  }

  buildBodyRows = ({ weeklyCode, workoutLevel }) => {
    if (_.isEmpty(weeklyCode) || _.isEmpty(workoutLevel)) return;

    const { dailyCodes } = _.find(WEEKLY_SCHEDULES, { code: weeklyCode });

    const exerciseCodes = _.flatMap(dailyCodes, codes => {
      const dayExercises = _.filter(_.union(DAILY_SCHEDULES[workoutLevel], DAILY_SCHEDULES.shared), ({ code }) =>
        _.includes(codes, code)
      );

      return _.flatMap(dayExercises, ({ exercises }) => _.map(exercises, 'code'));
    });

    const bodyRows = _.map(_.uniq(exerciseCodes), code => {
      const exercise = _.find(EXERCISES_DATABASE, { code });
      const { name } = exercise;
      return { code, name };
    });

    return bodyRows;
  };

  onClearAll = () =>
    this.props.onUpdate({
      bulkRecommendedWeight: undefined,
      bulkRest: undefined,
      bulkRpe: undefined,
      recommendedWeight: {},
      rest: {},
      rpe: {},
    });

  onCloneAll = () => {
    const { bulkRecommendedWeight, bulkRest, bulkRpe } = this.props.data;
    const bulkSize = this.state.bodyRows.length;
    const rowCodes = _.map(this.state.bodyRows, 'code');

    const recommendedWeight = _.fromPairs(_.zip(rowCodes, Array(bulkSize).fill(bulkRecommendedWeight)));
    const rest = _.fromPairs(_.zip(rowCodes, Array(bulkSize).fill(bulkRest)));
    const rpe = _.fromPairs(_.zip(rowCodes, Array(bulkSize).fill(bulkRpe)));

    this.props.onUpdate({ recommendedWeight, rest, rpe });
  };

  onClearRow = code => () => {
    const { recommendedWeight: currentRecommendedWeight, rest: currentRest, rpe: currentRpe } = this.props.data;
    const recommendedWeight = { ...currentRecommendedWeight, [code]: undefined };
    const rest = { ...currentRest, [code]: undefined };
    const rpe = { ...currentRpe, [code]: undefined };
    this.props.onUpdate({ recommendedWeight, rest, rpe });
  };

  onInputChange = (key, code) => event => {
    const { value } = event.target;

    // Bulk inputs
    if (code == null) {
      this.props.onUpdate({ [key]: value });
      return;
    }

    const { [key]: currentBundle } = this.props.data;
    this.props.onUpdate({ [key]: { ...currentBundle, [code]: value } });
  };

  renderHead = () => {
    const { bulkRecommendedWeight, bulkRest, bulkRpe } = this.props.data;

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

  renderBodyRow = ({ code, name }) => {
    const { recommendedWeight, rest, rpe } = this.props.data;

    return (
      <tr data-code={code}>
        <th className="align-middle" data-code={code} scope="row">
          {code}
        </th>
        <td className="align-middle">{name}</td>
        <DataInput name="rpe" onChange={this.onInputChange('rpe', code)} prefix="RPE-" value={rpe[code]} />
        <DataInput name="rest" onChange={this.onInputChange('rest', code)} suffix="s" value={rest[code]} />
        <DataInput
          name="recommended_weight"
          onChange={this.onInputChange('recommendedWeight', code)}
          suffix="kg"
          value={recommendedWeight[code]}
        />
        <td className="align-middle">
          <button className="btn px-1" onClick={this.onClearRow(code)} type="button">
            <i className="fa fa-trash text-danger" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <div className="col table-responsive" id="personalized-table">
        <table className="table table-borderless table-hover table-sm table-striped">
          {this.renderHead()}
          <tbody>{_.map(this.state.bodyRows, this.renderBodyRow)}</tbody>
        </table>
      </div>
    );
  }
}
