import fs from 'fs';
import _ from 'lodash';

// Locals
import CONSTANTS from '../app/constants';
import { parseDailySchedules, parseExercisesDatabase, parseWeeklySchedules } from './parsers';

const CONFIGS_DIR = './src/app/configs';
const DATA_DIR = './src/tasks/data';

function buildDailyScheduleConfigs() {
  _.each([...CONSTANTS.WORKOUT_LEVELS, 'shared'], async level => {
    try {
      const csvData = fs.readFileSync(`${DATA_DIR}/daily_schedules/${level}.csv`, 'utf-8');
      const dailySchedules = await parseDailySchedules(csvData);
      fs.writeFileSync(
        `${CONFIGS_DIR}/daily_schedules_${level}.json`,
        JSON.stringify(dailySchedules, null, 2),
      );
    } catch (error) {
      throw error;
    }
  });
}

async function buildExercisesDatabaseConfigs() {
  try {
    const csvData = fs.readFileSync(`${DATA_DIR}/exercises_database.csv`, 'utf-8');
    const exercisesDatabase = await parseExercisesDatabase(csvData);
    fs.writeFileSync(
      `${CONFIGS_DIR}/exercises_database.json`,
      JSON.stringify(exercisesDatabase, null, 2),
    );
  } catch (error) {
    throw error;
  }
}

async function buildWeeklyScheduleConfigs() {
  try {
    const csvData = fs.readFileSync(`${DATA_DIR}/weekly_schedules.csv`, 'utf-8');
    const weeklySchedules = await parseWeeklySchedules(csvData);
    fs.writeFileSync(
      `${CONFIGS_DIR}/weekly_schedules.json`,
      JSON.stringify(weeklySchedules, null, 2),
    );
  } catch (error) {
    throw error;
  }
}

try {
  buildExercisesDatabaseConfigs();
  buildWeeklyScheduleConfigs();
  buildDailyScheduleConfigs();
} catch (error) {
  console.warn(error);
}
