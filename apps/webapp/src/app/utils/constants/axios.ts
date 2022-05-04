import axios from 'axios';

import { AuthRoutePaths, ResponseStatuses } from '@utils/enums';

const axiosInstance = axios.create({
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === ResponseStatuses.STATUS_NOT_AUTHORIZED && !window.location.href.includes(AuthRoutePaths.REFRESH)) {
      window.location.href = AuthRoutePaths.REFRESH;
      return;
    }
  });

export {
  axiosInstance
};
