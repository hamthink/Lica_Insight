import axios from 'axios';

function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  return instance;
}

export { apiInstance };
