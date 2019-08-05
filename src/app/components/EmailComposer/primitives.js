import _ from 'lodash';

export const DEFAULT_STATE = {
  alertMessage: undefined,
  bccAddresses: undefined,
  ccAddresses: undefined,
  loading: false,
  subject: undefined,
  toAddresses: undefined,
};

export const INPUT_IDS = {
  BCC_ADDRESSES: 'bccAddresses',
  CC_ADDRESSES: 'ccAddresses',
  SUBJECT: 'subject',
  TO_ADDRESSES: 'toAddresses',
};

export const INPUT_CONFIGS = {
  [INPUT_IDS.BCC_ADDRESSES]: { label: 'Bcc', multiple: true, type: 'email' },
  [INPUT_IDS.CC_ADDRESSES]: { label: 'Cc', multiple: true, type: 'email' },
  [INPUT_IDS.SUBJECT]: { label: 'Tiêu đề', required: true },
  [INPUT_IDS.TO_ADDRESSES]: { label: 'To', multiple: true, required: true, type: 'email' },
};

export function buildAlertMessage(error, successMessage) {
  if (error == null) {
    return { message: successMessage, type: 'success' };
  }

  const data = _.get(error, 'response.data');

  const message = (
    <div>
      <div>{error.message}</div>
      {!_.isEmpty(data) && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );

  return { message, type: 'danger' };
}

export function normalizeInputValue(key, value) {
  if (key === INPUT_IDS.TO_ADDRESSES || key === INPUT_IDS.CC_ADDRESSES || key === INPUT_IDS.BCC_ADDRESSES)
    return _.split(value, ',');

  return value;
}
