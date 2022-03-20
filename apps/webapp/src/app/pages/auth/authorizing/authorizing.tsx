import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { login as setAuthData } from '@store/reducers/authSlice';
import { axios, API_LOGIN_ERROR } from '@utils/constants';
import { AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import { IAuthResponse } from '@utils/interfaces';
import { useAlerts, useApi, useAuthHandlers } from '@utils/hooks';

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

        history.goBack();
      })
      .catch(() => {
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
