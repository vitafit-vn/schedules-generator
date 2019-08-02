import axios from 'axios';

// Constants
import { IS_PRODUCTION } from 'app/constants';

const baseURL = IS_PRODUCTION
  ? 'https://4ju8elyjv7.execute-api.us-east-1.amazonaws.com/production'
  : 'https://u03zcg5h97.execute-api.us-east-1.amazonaws.com/dev';

const axiosInstance = axios.create({ baseURL });

function sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress }) {
  const data = JSON.stringify({ htmlBody, sourceKey, subject, toAddress });
  return axiosInstance.post('/sendEmail', data);
}

export function sendHlvOnlineEmail({ htmlBody, subject, toAddress }) {
  return sendHtmlEmail({ htmlBody, subject, toAddress, sourceKey: 'HlvOnline' });
}

export function sendSalesEmail({ htmlBody, subject, toAddress }) {
  return sendHtmlEmail({ htmlBody, subject, toAddress, sourceKey: 'Sales' });
}
