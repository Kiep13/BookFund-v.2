import axios, { AxiosResponse } from 'axios';

import { ResponseStatuses } from '@core/enums';

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async (error) => {
  if(error.status === ResponseStatuses.STATUS_NOT_AUTHORIZED) {

  }
});

export {
  axios
};
