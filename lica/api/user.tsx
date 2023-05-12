import { apiInstance } from 'api';

const api = apiInstance();

function getEmailVerificationCode(params, success, fail) {
  api.get('/user/email', { params: params }).then(success).catch(fail);
}

function postCheckVerificationCode(params, success, fail) {
  api.post('/user/auth', { params: params }).then(success).catch(fail);
}

export { getEmailVerificationCode, postCheckVerificationCode };
