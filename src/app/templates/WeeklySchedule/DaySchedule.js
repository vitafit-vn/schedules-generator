import _ from 'lodash';
import PropTypes from 'prop-types';

// Locals
import ExerciseTable from '../reusables/ExerciseTable';
import ExerciseRow from '../reusables/ExerciseRow';

const DaySchedule = ({ exercises, title }) => {
  const marginClass = _.isEmpty(exercises) ? 'mb-3' : '';

  return (
    <div>
      <div className={`bg-secondary font-weight-bold p-2 text-center text-white ${marginClass}`}>{title}</div>
      {!_.isEmpty(exercises) && (
        <ExerciseTable>
          {_.map(exercises, exercise => (
            <ExerciseRow {...exercise} />
          ))}
        </ExerciseTable>
      )}
    </div>
  );
};

DaySchedule.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default DaySchedule;
