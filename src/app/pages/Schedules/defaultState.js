// Constants
import { WEEKLY_SCHEDULES, WORKOUT_LEVELS } from 'app/constants';

export default {
  customerInfo: {
    birthYear: undefined,
    customerId: undefined,
    fullName: undefined,
    height: undefined,
    weekPeriod: undefined,
    weeklyCode: WEEKLY_SCHEDULES[0].code,
    weight: undefined,
    workoutLevel: WORKOUT_LEVELS[0],
  },
  personalizedData: {
    bulkRecommendedWeight: undefined,
    bulkRest: undefined,
    bulkRpe: undefined,
    recommendedWeight: {},
    rest: {},
    rpe: {},
  },
  // eslint-disable-next-line global-require
  // ...(process.env.NODE_ENV === 'development' ? require('app/data/fixtures/schedules_input.json') : {}),
};
