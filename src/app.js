// Locals
import { /* parseDailySchedules, */ parseWeeklySchedules } from './parsers';

async function parseAndGenerate() {
  try {
    // const beginnerDailySchedules = await parseDailySchedules('beginner');
    // const intermediateDailySchedules = await parseDailySchedules('intermediate');
    const weeklySchedules = await parseWeeklySchedules();
    console.debug(JSON.stringify(weeklySchedules, null, 2));
  } catch (error) {
    console.error(error);
  }
}

parseAndGenerate();
