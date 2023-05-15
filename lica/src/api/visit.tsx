import { apiInstance } from '@/api';

const api = apiInstance();

function getVisitTrack(params, success, fail) {
  api.get(`/visit/track`, { params: params }).then(success).catch(fail);
}

function getVisit(params, success, fail) {
  api.get('/visit', { params: params }).then(success).catch(fail);
}

export { getVisitTrack, getVisit };
