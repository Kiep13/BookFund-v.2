import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { axios, API_LOGIN_ERROR } from '@core/constants';
import { AuthRoutePaths, BaseRoutePaths } from '@core/enums';
import { IAuthResponse } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock';
import { useApi } from '@shared/hooks';
import { login as setAuthData } from '@store/reducers/authSlice';

import { IPageParams } from './interfaces';
import { API_SESSION_EXPIRED_ERROR, STYLES, SUCCESSFULLY_AUTHORIZED } from './constants';

export const Authorizing = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { login, refresh } = useApi();
  const { addSuccess, addError } = useAlerts();

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
        addError(API_LOGIN_ERROR);
        history.push(AuthRoutePaths.LOGIN);
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
        addError(API_SESSION_EXPIRED_ERROR);
        history.push(AuthRoutePaths.LOGIN);
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
