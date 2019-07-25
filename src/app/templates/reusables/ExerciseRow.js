import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import YoutubeLink from './YoutubeLink';

function buildSetReps({ reps, sets }) {
  const suffix = isNaN(reps) ? '' : ' reps'; // eslint-disable-line no-restricted-globals
  return `${sets} sets x ${reps}${suffix}`;
}

function buildWeightValue({ recommendedWeight, rpe }) {
  if (!_.isEmpty(recommendedWeight) && !_.isEmpty(rpe)) {
    return `${recommendedWeight}kg (RPE-${rpe})`;
  }

  if (!_.isEmpty(recommendedWeight)) return `${recommendedWeight}kg`;
  if (!_.isEmpty(rpe)) return `RPE-${rpe}`;
  return undefined;
}

const ExerciseRow = ({ difficulty, muscle, name, order, recommendedWeight, reps, rest, rpe, sets, videoUrl }) => {
  const weight = buildWeightValue({ recommendedWeight, rpe });

  const rows = _.compact([
    { label: 'Nhóm cơ', value: `${muscle} (${difficulty})` },
    weight != null && { label: 'Mức tạ', value: buildWeightValue({ recommendedWeight, rpe }) },
    { label: 'Số lượng', value: buildSetReps({ reps, sets }) },
    { label: 'Nghỉ', value: _.isEmpty(rest) ? '-' : `${rest}s` },
  ]);

  return (
    <tr>
      <th className="align-middle border border-primary p-3" scope="row">
        {order}
      </th>
      <td className="align-middle border border-primary p-3 text-left">
        <h5>
          {name}
          <YoutubeLink name={name} url={videoUrl} />
        </h5>
        <ul className="m-0 p-0">
          {_.map(rows, ({ label, value }) => (
            <li className="list-inline-item mr-4">
              {`${label}: `}
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

ExerciseRow.propTypes = {
  difficulty: PropTypes.string.isRequired,
  muscle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  recommendedWeight: PropTypes.string,
  reps: PropTypes.string.isRequired,
  rest: PropTypes.string,
  rpe: PropTypes.string,
  sets: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
};

export default ExerciseRow;
