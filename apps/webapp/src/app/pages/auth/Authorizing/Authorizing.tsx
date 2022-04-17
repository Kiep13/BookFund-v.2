import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { login as setAuthData } from '@store/reducers/authSlice';
import {
  axiosInstance as axios,
  API_LOGIN_ERROR,
  RELOAD_PATHNAME_STORAGE_KEY,
  RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY
} from '@utils/constants';
import { AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import { IAuthResponse } from '@utils/interfaces';
import { useAlerts, useApi, useAuthHandlers, useStorage } from '@utils/hooks';

import { IPageParams } from './interfaces';
import { API_SESSION_EXPIRED_ERROR, STYLES, SUCCESSFULLY_AUTHORIZED } from './constants';

export const Authorizing = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { login, refresh } = useApi();
  const { addSuccess } = useAlerts();
  const { handleLogOut } = useAuthHandlers();
  const { doesStorageHave, getFromStorage, deleteFromStorage } = useStorage();

  const navigateBack = () => {
    if(doesStorageHave(RELOAD_PATHNAME_STORAGE_KEY)) {
      const pathname = getFromStorage(RELOAD_PATHNAME_STORAGE_KEY);
      deleteFromStorage(RELOAD_PATHNAME_STORAGE_KEY);

      history.push(pathname);
      return;
    }

    history.goBack();
  }

  const sendLoginRequest = () => {
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

  const sendRefreshRequest = () => {
    refresh()
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.accessToken}`;

        navigateBack();
      })
      .catch(() => {
        if(doesStorageHave(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY) && getFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY)) {
          deleteFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY);
          navigateBack();
          return;
        }

        handleLogOut(API_SESSION_EXPIRED_ERROR);
      })
  }

  useEffect(() => {
    if(location.pathname === AuthRoutePaths.REFRESH) {
      sendRefreshRequest();
    } else {
      sendLoginRequest();
    }
  }, []);

  return (
    <Box sx={STYLES.page}>
      <Box sx={STYLES.content}>
        <CircularProgress size={150}/>
        <Typography variant='h2' gutterBottom component='div'>
          Loading
        </Typography>
      </Box>
    </Box>
  )
}
