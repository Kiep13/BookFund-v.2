import { Alert } from '@mui/lab';
import { Box } from '@mui/material';

import { useAlerts } from '@features/alerts-block/hooks';

import { STYLES } from './constants';
import { IAlert } from './interfaces';

export const AlertsBlock = () => {
  const { alerts } = useAlerts();

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
