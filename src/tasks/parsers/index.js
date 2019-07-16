import csv from 'csv';

// Locals
import { convertDailySchedulesRecords, convertWeeklySchedulesRecords } from './converters';

function parseCsvData(csvData, converter) {
  const stringifiedCsvData = String(csvData);

  return new Promise((resolve, reject) => {
    csv.parse(stringifiedCsvData, (error, records) => {
      if (error != null) {
        reject(error);
        return;
      }

      resolve(converter(records));
    });
  });
}

export function parseDailySchedules(csvData) {
  return parseCsvData(csvData, convertDailySchedulesRecords);
}

export function parseExercisesDatabase(csvData) {
  return parseCsvData(csvData, convertDailySchedulesRecords);
}

export function parseWeeklySchedules(csvData) {
  return parseCsvData(csvData, convertWeeklySchedulesRecords);
}
