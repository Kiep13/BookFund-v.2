import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { API_LOGIN_ERROR } from '@core/constants';
import { AuthRoutePaths, BaseRoutePaths } from '@core/enums';
import { IAuthResponse } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock';
import { useApi } from '@shared/hooks';
import { login as setAuthData } from '@store/reducers/authSlice';

import { IPageParams } from './interfaces';
import { STYLES } from './constants';

export const Authorizing = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { login } = useApi();
  const { addSuccess, addError } = useAlerts();
  const dispatch = useDispatch();

  const sendLoginRequest = () => {
    const provider = (params as IPageParams).provider;
    const code = new URLSearchParams(location.search).get('code') || '';

    login(provider, code)
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse.account));
        
        addSuccess('Successfully authorized');
        history.push(BaseRoutePaths.HOME);
      })
      .catch((e) => {
        console.log(e)
        addError(API_LOGIN_ERROR);
        history.push(AuthRoutePaths.LOGIN);
      });
  }

  useEffect(() => {
    sendLoginRequest();
  }, []);

  return (
    <Box sx={STYLES.page}>
      <Box sx={STYLES.content}>
        <CircularProgress size={150}/>
        <Typography variant='h2' gutterBottom component='div'>
          Authorizing
        </Typography>
      </Box>
    </Box>
  )
}
