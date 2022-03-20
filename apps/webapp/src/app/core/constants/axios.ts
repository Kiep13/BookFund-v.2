import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router';

import { AuthRoutePaths, ResponseStatuses } from '@core/enums';

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async (error) => {
  if(error.status === ResponseStatuses.STATUS_NOT_AUTHORIZED) {
    const history = useHistory();
    history.push(AuthRoutePaths.REFRESH);
    return;
  }
});

export {
  axios
};
