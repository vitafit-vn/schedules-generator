// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

export default {
  customerInfo: {
    birthYear: undefined,
    customerId: undefined,
    height: undefined,
    email: undefined,
    name: undefined,
    weeklyCode: WEEKLY_SCHEDULES[0].code,
    weight: undefined,
    workoutLevel: WORKOUT_LEVELS[0],
    weekPeriod: undefined,
  },
  personalizedData: {
    bulkRecommendedWeight: undefined,
    bulkRest: undefined,
    bulkRpe: undefined,
    recommendedWeight: {},
    rest: {},
    rpe: {},
  },
  ...require('app/data/fixtures/schedules_input.json'), // eslint-disable-line
};
