import { Alert, Box } from '@mui/material'
import { useSelector } from 'react-redux';

import { getAlerts } from '@store/reducers/alertsStore';
import { IAlert } from '@utils/interfaces';

import { STYLES } from './constants';

export const AlertsBlock = () => {
  const alerts = useSelector(getAlerts);

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
