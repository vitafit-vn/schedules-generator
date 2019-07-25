import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import YoutubeLink from './YoutubeLink';

const ExerciseRow = ({ difficulty, muscle, name, order, recommendedWeight, reps, rest, rpe, sets, videoUrl }) => {
  const weights = _.compact([
    _.isEmpty(recommendedWeight) ? '-' : `${recommendedWeight}kg`,
    _.isEmpty(rpe) ? undefined : `(RPE-${rpe})`,
  ]);

  const rows = [
    { label: 'Nhóm cơ', value: `${muscle} (${difficulty})` },
    { label: 'Mức tạ', value: _.isEmpty(weights) ? '-' : _.join(weights, ' ') },
    { label: 'Số lượng', value: `${sets} sets x ${reps} reps` },
    { label: 'Nghỉ', value: _.isEmpty(rest) ? '-' : `${rest}s` },
  ];

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
        <ul className="container-fluid mb-0">
          {_.map(rows, ({ label, value }) => (
            <li>
              <strong>{label}</strong>
              {': '}
              {value}
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
