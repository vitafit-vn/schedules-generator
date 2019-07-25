import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://4ju8elyjv7.execute-api.us-east-1.amazonaws.com/production',
});

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
