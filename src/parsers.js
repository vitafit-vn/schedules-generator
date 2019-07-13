import fs from 'fs';
import _ from 'lodash';
import csv from 'csv';

const DATA_DIR = './src/data';

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

function resolveWeeklySchedulesRecords(records) {
  const schedulesMapping = {};

  _.each(records, row => {
    const [code, week, ...weekdays] = row;
    schedulesMapping[code] = schedulesMapping[code] || {};
    schedulesMapping[code][week] = weekdays;
  });

  const schedulesPairs = _.toPairs(schedulesMapping);

  return _.map(schedulesPairs, ([code, schedulesByWeek]) => {
    const weekPairs = _.toPairs(schedulesByWeek);
    const weekSchedules = _.map(weekPairs, ([week, weekDays]) => {
      const weekNumber = parseInt(week.replace('week_', ''), 10);
      return { weekNumber, weekDays };
    });
    return { code, weekSchedules };
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
