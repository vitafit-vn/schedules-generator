import { IS_PRODUCTION } from 'app/constants';

export default {
  customerInfo: {
    abs: undefined,
    activityRate: undefined,
    birthYear: undefined,
    customerId: undefined,
    fullName: undefined,
    gender: undefined,
    height: undefined,
    hip: undefined,
    issueDate: undefined,
    target: undefined,
    weight: undefined,
  },
  ...(IS_PRODUCTION ? {} : require('app/data/fixtures/health_reports_input.json')), // eslint-disable-line
};
