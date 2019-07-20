import { createContext } from 'preact-context';

const SchedulesInput = createContext({
  birthYear: undefined,
  customerId: undefined,
  height: undefined,
  name: undefined,
  personalizedData: {
    bulkRecommendedWeight: undefined,
    bulkRest: undefined,
    bulkRpe: undefined,
    recommendedWeight: [],
    rest: [],
    rpe: [],
  },
  weekVariant: undefined,
  weeklyCode: undefined,
  weight: undefined,
  workoutLevel: undefined,
});

const UserAuth = createContext({ userData: undefined });

export { SchedulesInput, UserAuth };
