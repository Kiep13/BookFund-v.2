import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { login as setAuthData } from '@store/reducers/authSlice';
import {
  axiosInstance as axios,
  API_LOGIN_ERROR,
  RELOAD_PATHNAME_STORAGE_KEY,
  RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY, RELOAD_PUBLIC_FINISHED
} from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { IAuthResponse } from '@utils/interfaces';
import { useAlerts, useApi, useAuthHandlers, useStorage } from '@utils/hooks';

import { IPageParams } from './interfaces';
import { API_SESSION_EXPIRED_ERROR, SUCCESSFULLY_AUTHORIZED } from './constants';

export const useAuthorizing = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const {login, refresh} = useApi();
  const {addSuccess} = useAlerts();
  const {handleLogOut} = useAuthHandlers();
  const {doesStorageHave, getFromStorage, deleteFromStorage, saveToStorage} = useStorage();

  const navigateBack = (): void => {
    if (doesStorageHave(RELOAD_PATHNAME_STORAGE_KEY)) {
      const pathname = getFromStorage(RELOAD_PATHNAME_STORAGE_KEY);
      deleteFromStorage(RELOAD_PATHNAME_STORAGE_KEY);

      history.push(pathname);
      return;
    }

    history.goBack();
  }

  const sendLoginRequest = (): void => {
    const provider = (params as IPageParams).provider;
    const code = new URLSearchParams(location.search).get('code') || '';

    login(provider, code)
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.accessToken}`;

        addSuccess(SUCCESSFULLY_AUTHORIZED);
        history.push(BaseRoutePaths.HOME);
      })
      .catch(() => {
        handleLogOut(API_LOGIN_ERROR);
      });
  }

  const sendRefreshRequest = (): void => {
    refresh()
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.accessToken}`;

        if (doesStorageHave(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY) && getFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY)) {
          deleteFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY);
        }

        navigateBack();
      })
      .catch(() => {

        if (doesStorageHave(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY) && getFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY)) {
          deleteFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY);
          saveToStorage(RELOAD_PUBLIC_FINISHED, true);

          navigateBack();
          return;
        }

        handleLogOut(API_SESSION_EXPIRED_ERROR);
      })
  }

  return {
    sendRefreshRequest,
    sendLoginRequest
  }
}
