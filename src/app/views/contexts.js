import { createContext } from 'preact-context';

const SchedulesInput = createContext({
  customerInfo: {
    birthYear: undefined,
    customerId: 'KH0001',
    height: undefined,
    name: undefined,
    weekVariant: undefined,
    weeklyCode: undefined,
    weight: undefined,
    workoutLevel: undefined,
  },
  personalizedData: {
    bulkRecommendedWeight: undefined,
    bulkRest: undefined,
    bulkRpe: undefined,
    recommendedWeight: [],
    rest: [],
    rpe: [],
  },
  // updateCustomerInfo: () => {},
  // updatePersonalizedData: () => {},
});

const UserAuth = createContext({ userData: { avatarUrl: 'https://tools.vitafit.vn/images/logo.png' } });

export { SchedulesInput, UserAuth };
