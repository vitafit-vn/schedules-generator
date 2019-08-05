import fs from 'fs';
import _ from 'lodash';
import fp from 'lodash/fp';

// Constants
import { WORKOUT_LEVELS, WORKOUT_VARIANTS } from '../app/constants';

// Locals
import { parseDailySchedules, parseExercisesDatabase, parseWeeklySchedules } from './parsers';

const CONFIGS_DIR = './src/app/data';
const DATA_DIR = './src/tasks/data';
const IMAGES_SRC_DIR = './src/static';
const IMAGES_PATH = '/images/exercises/';

async function buildDailyScheduleConfigs() {
  const csvData = fp.flow(
    fp.map('code'),
    fp.concat(['shared']),
    fp.map(chunk => fs.readFileSync(`${DATA_DIR}/daily_schedules/${chunk}.csv`, 'utf-8')),
    fp.join('\n')
  )(WORKOUT_LEVELS);

  try {
    const dailySchedules = await parseDailySchedules(csvData);
    fs.writeFileSync(`${CONFIGS_DIR}/daily_schedules.json`, JSON.stringify(dailySchedules, null, 2));
  } catch (error) {
    console.warn(error);
  }
}

async function buildExercisesDatabaseConfigs() {
  const csvData = fp.flow(
    fp.map('code'),
    fp.concat(['shared']),
    fp.map(chunk => fs.readFileSync(`${DATA_DIR}/exercises_database/${chunk}.csv`, 'utf-8')),
    fp.join('\n')
  )(WORKOUT_VARIANTS);

  try {
    const exercises = await parseExercisesDatabase(csvData);
    const exerciseImages = fs.readdirSync(`${IMAGES_SRC_DIR}/images/exercises`);
    const imagesMapping = _.fromPairs(
      _.map(exerciseImages, filename => {
        const [code] = _.split(filename, '.');
        return [code, IMAGES_PATH + filename];
      })
    );

    const allExercises = _.map(exercises, exercise => {
      const { code } = exercise;
      const { [code]: imageUrl } = imagesMapping;
      return { ...exercise, imageUrl };
    });

    fs.writeFileSync(`${CONFIGS_DIR}/exercises_database.json`, JSON.stringify(allExercises, null, 2));
  } catch (error) {
    console.warn(error);
  }
}

async function buildWeeklyScheduleConfigs() {
  try {
    const csvData = fs.readFileSync(`${DATA_DIR}/weekly_schedules.csv`, 'utf-8');
    const weeklySchedules = await parseWeeklySchedules(csvData);
    fs.writeFileSync(`${CONFIGS_DIR}/weekly_schedules.json`, JSON.stringify(weeklySchedules, null, 2));
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
