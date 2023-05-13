import { apiInstance } from '@/api';

const api = apiInstance();

function getEmailVerificationCode(params, success, fail) {
  api.get('/user/email', { params: params }).then(success).catch(fail);
}

function postCheckVerificationCode(params, success, fail) {
  api.post('/user/auth', params).then(success).catch(fail);
}

function postJoin(params, success, fail) {
  api.post('/user/join', params).then(success).catch(fail);
}

function postLogin(params, success, fail) {
  api.post('/user/login', params).then(success).catch(fail);
}

export {
  getEmailVerificationCode,
  postCheckVerificationCode,
  postJoin,
  postLogin
};
