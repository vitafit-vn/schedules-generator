import PropTypes from 'prop-types';

const ExerciseTable = ({ children }) => (
  <div className="table-responsive">
    <table className="table table-borderless table-sm text-center text-wrap">
      <thead>
        <tr className="bg-primary border border-primary font-weight-bold text-white">
          {/* eslint-disable prettier/prettier */}
          <th className="align-middle" scope="col">{'STT'}</th>
          <th className="align-middle" scope="col">{'Chi tiết bài tập'}</th>
          {/* eslint-enable prettier/prettier */}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

ExerciseTable.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.any,
};

export default ExerciseTable;
