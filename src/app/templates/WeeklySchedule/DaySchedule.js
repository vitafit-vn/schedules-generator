import _ from 'lodash';
import PropTypes from 'prop-types';

import ExerciseRow from '../ExerciseRow';

const DaySchedule = ({ exercises, title }) => {
  const marginClass = _.isEmpty(exercises) ? 'mb-3' : '';

  return (
    <div>
      <div className={`bg-secondary font-weight-bold py-2 text-center text-white ${marginClass}`}>{title}</div>
      {!_.isEmpty(exercises) && (
        <div className="table-responsive">
          <table className="table table-borderless table-sm text-center text-wrap">
            <thead>
              {/* eslint-disable prettier/prettier */}
              <tr className="bg-primary border border-primary font-weight-bold text-white">
                <th className="align-middle" scope="col">{'Bài tập'}</th>
                <th className="align-middle" scope="col">{'Nhóm cơ'}</th>
                <th className="align-middle" scope="col">{'Độ khó'}</th>
                <th className="align-middle" scope="col">{'Sets'}</th>
                <th className="align-middle" scope="col">{'Reps'}</th>
                <th className="align-middle" scope="col">{'Mức tạ'}</th>
                <th className="align-middle" scope="col">{'Nghỉ'}</th>
                <th className="align-middle recommended-weight" scope="col">Khối lượng<br />khuyến nghị</th>
              </tr>
              {/* eslint-enable prettier/prettier */}
            </thead>
            <tbody>
              {_.map(exercises, exercise => (
                <ExerciseRow {...exercise} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

DaySchedule.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default DaySchedule;
