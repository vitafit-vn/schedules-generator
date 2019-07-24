import _ from 'lodash';
import Markup from 'preact-markup';

const NOTES = [
  <Markup markup={'<strong>Sets</strong>: là số hiệp cần tập trong 1 buổi'} />,
  <Markup markup={'<strong>Reps</strong>: là số lần cần thực hiện trong 1 hiệp'} />,
  'Tập đúng lịch(đúng số bài, số hiệp, số lần & thời gian nghỉ)',
  'Không đảo ngày tập',
  'Không đảo bài tập',
];

const ScheduleNotes = () => (
  <div className="mt-2">
    <h5 className="font-weight-bold">{'Lưu ý:'}</h5>
    <ul>
      {_.map(NOTES, note => (
        <li>{note}</li>
      ))}
    </ul>
  </div>
);

export default ScheduleNotes;
