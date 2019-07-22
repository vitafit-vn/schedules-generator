import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import ExerciseTable from '../reusables/ExerciseTable';
import ExerciseRow from '../reusables/ExerciseRow';

const DailyExercise = ({ exercises, title }) => (
  <div>
    <div className="bg-secondary font-weight-bold mt-3 py-2 text-center text-white">{title}</div>
    {_.map(exercises, ({ imageUrl, instructions, ...exercise }) => (
      <ExerciseTable>
        <ExerciseRow {...exercise} />
        {!_.isEmpty(imageUrl) && (
          <tr>
            <td className="border border-primary p-2 text-justify" colSpan="8">
              <img className="img-fluid" src={imageUrl} />
            </td>
          </tr>
        )}
        {!_.isEmpty(instructions) && (
          <tr>
            <td className="border border-primary p-2 text-justify" colSpan="8">
              <h5>{'Hướng dẫn:'}</h5>
              <div>{instructions}</div>
            </td>
          </tr>
        )}
      </ExerciseTable>
    ))}
  </div>
);

DailyExercise.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default DailyExercise;
