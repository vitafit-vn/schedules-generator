// Locals
import { parseDailySchedules } from './parsers';

async function parseAndGenerate() {
  try {
    // const beginnerRecords = await parseDailySchedules('beginner');
    const intermediateRecords = await parseDailySchedules('intermediate');
    console.debug(JSON.stringify(intermediateRecords, null, 2));
  } catch (error) {
    console.error(error);
  }
}

parseAndGenerate();
