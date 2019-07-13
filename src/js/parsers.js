import fs from 'fs';
import _ from 'lodash';
import csv from 'csv';

const DATA_DIR = './src/data';
const WEEKDAYS = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ 7', 'Chủ nhật'];

function resolveDailySchedulesRecords(records) {
  const dailySchedules = [];
  let currentSchedule;
  let currentExercises = [];

  _.each(records, row => {
    const scheduleName = row[0];

    // New daily schedule
    if (!_.isEmpty(scheduleName)) {
      // Save current schedule
      if (!_.isEmpty(currentSchedule)) {
        dailySchedules.push({ name: currentSchedule, exercises: currentExercises });
      }

      // Move to next schedule
      currentSchedule = scheduleName;
      currentExercises = [];
      return;
    }

    // Next exercise in current daily schedule
    const [, code, name, muscle, difficulty, sets, reps] = row;
    const exercise = {
      code,
      difficulty,
      muscle,
      name,
      reps,
      sets,
    };

    currentExercises.push(exercise);
  });

  // Save last schedule
  if (!_.isEmpty(currentSchedule)) {
    dailySchedules.push({ name: currentSchedule, exercises: currentExercises });
  }

  return dailySchedules;
}

function mapWeekDays(weekDays) {
  const titles = _.slice(WEEKDAYS, 0, weekDays.length);
  const pairs = _.zip(titles, weekDays);
  return _.map(pairs, ([title, exercises]) => ({ title, exercises }));
}

function resolveWeeklySchedulesRecords(records) {
  const schedulesMapping = {};

  _.each(records, row => {
    const [code, weekNumber, ...weekdays] = row;
    schedulesMapping[code] = schedulesMapping[code] || {};
    schedulesMapping[code][weekNumber] = mapWeekDays(weekdays);
  });

  const schedulesPairs = _.toPairs(schedulesMapping);

  return _.map(schedulesPairs, ([code, schedulesByWeek]) => {
    const weekPairs = _.toPairs(schedulesByWeek);
    const byWeeks = _.map(weekPairs, ([weekNumber, weekDays]) => ({ weekNumber, weekDays }));
    return { code, byWeeks };
  });
}

export function parseDailySchedules(level) {
  const csvData = fs.readFileSync(`${DATA_DIR}/daily_schedules/${level}.csv`, 'utf-8');
  const stringifiedCsvData = String(csvData);

  return new Promise((resolve, reject) => {
    csv.parse(stringifiedCsvData, (error, records) => {
      if (error != null) {
        reject(error);
        return;
      }

      const schedules = resolveDailySchedulesRecords(records);
      resolve(schedules);
    });
  });
}

export function parseWeeklySchedules() {
  const csvData = fs.readFileSync(`${DATA_DIR}/weekly_schedules.csv`, 'utf-8');
  const stringifiedCsvData = String(csvData);

  return new Promise((resolve, reject) => {
    csv.parse(stringifiedCsvData, (error, records) => {
      if (error != null) {
        reject(error);
        return;
      }

      const schedules = resolveWeeklySchedulesRecords(records);
      resolve(schedules);
    });
  });
}
