import axios from 'axios';

// Constants
import { IS_PRODUCTION } from 'app/constants';

const baseURL = IS_PRODUCTION
  ? 'https://4ju8elyjv7.execute-api.us-east-1.amazonaws.com/production'
  : 'https://u03zcg5h97.execute-api.us-east-1.amazonaws.com/dev';

const axiosInstance = axios.create({ baseURL });

function sendHtmlEmail({ bccAddresses, ccAddresses, htmlBody, sourceKey, subject, toAddresses }) {
  const data = JSON.stringify({ bccAddresses, ccAddresses, htmlBody, sourceKey, subject, toAddresses });
  return axiosInstance.post('/sendEmail', data);
}

export function sendHlvOnlineEmail(params) {
  return sendHtmlEmail({ ...params, sourceKey: 'HlvOnline' });
}

export function sendSalesEmail(params) {
  return sendHtmlEmail({ ...params, sourceKey: 'Sales' });
}
