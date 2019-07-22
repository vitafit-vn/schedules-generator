import PropTypes from 'prop-types';

const ExerciseTable = ({ children }) => (
  <div className="table-responsive">
    <table className="table table-borderless table-sm text-center text-wrap">
      <thead>
        <tr className="bg-primary border border-primary font-weight-bold text-white">
          {/* eslint-disable prettier/prettier */}
          <th className="align-middle" scope="col">{'Bài tập'}</th>
          <th className="align-middle" scope="col">{'Nhóm cơ'}</th>
          <th className="align-middle" scope="col">{'Độ khó'}</th>
          <th className="align-middle" scope="col">{'Sets'}</th>
          <th className="align-middle" scope="col">{'Reps'}</th>
          <th className="align-middle" scope="col">{'Mức tạ'}</th>
          <th className="align-middle" scope="col">{'Nghỉ'}</th>
          {/* eslint-enable prettier/prettier */}
          <th className="align-middle recommended-weight" scope="col">
            {'Khối lượng'}
            <br />
            {'khuyến nghị'}
          </th>
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
