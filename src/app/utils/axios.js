import axios from 'axios';

// Constants
import { BASE_URL } from 'app/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

function sendHtmlEmail({ htmlBody, sourceKey, subject, toAddress }) {
  const data = JSON.stringify({ htmlBody, sourceKey, subject, toAddress });
  return axiosInstance.post('/sendEmail', { data });
}

export function sendHlvOnlineEmail({ htmlBody, subject, toAddress }) {
  return sendHtmlEmail({ htmlBody, subject, toAddress, sourceKey: 'HlvOnline' });
}

export function sendSalesEmail({ htmlBody, subject, toAddress }) {
  return sendHtmlEmail({ htmlBody, subject, toAddress, sourceKey: 'Sales' });
}
