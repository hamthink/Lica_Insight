import { apiInstance } from '@/api';

const api = apiInstance();

// 동선
function getVisitTrack(params, success, fail) {
  api
    .get(`/visit/track/filtered`, { params: params })
    .then(success)
    .catch(fail);
}

function getVisitDaily(params, success, fail) {
  api
    .get(`/visit/daily-visitor-statistics`, { params: params })
    .then(success)
    .catch(fail);
}

function getVisitWeekly(params, success, fail) {
  api
    .get(`/visit/weekly-visitor-statistics`, { params: params })
    .then(success)
    .catch(fail);
}

// 히트맵, 점맵
function getVisit(params, success, fail) {
  api.get('/visit', { params: params }).then(success).catch(fail);
}

export { getVisitTrack, getVisitDaily, getVisitWeekly, getVisit };
