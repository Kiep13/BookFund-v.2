import { Alert } from '@mui/lab';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAlerts } from '@features/alertsBlock/hooks';
import { getAlerts } from '@store/subStates/alertsStore';

import { STYLES } from './constants';
import { IAlert } from './interfaces';

export const AlertsBlock = () => {
  const alerts = useSelector(getAlerts);
  const { addSuccess } = useAlerts();

  useEffect(() => {
    setInterval(() => {
      addSuccess('test');
    }, 1000)
  }, []);

  console.log(alerts);

  return (
    <Box sx={STYLES.alertsWrapper}>
      {
        alerts.map((alert: IAlert) => {
          return <Alert key={alert.id} severity={alert.type} sx={STYLES.alert}>{alert.message}</Alert>
        })
      }
    </Box>
  )
}
