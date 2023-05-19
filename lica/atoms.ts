import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: { isLoggedIn: false, accessToken: null }
});

export const userState = atom({
  key: 'userState',
  default: {
    name: null,
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'SSAFY'
  }
});
