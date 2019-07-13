import fs from 'fs';
import _ from 'lodash';
import csv from 'csv';

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

/* eslint-disable import/prefer-default-export */

export function parseDailySchedules(level) {
  const csvData = fs.readFileSync(`./src/data/daily-schedules/${level}.csv`, 'utf-8');
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
