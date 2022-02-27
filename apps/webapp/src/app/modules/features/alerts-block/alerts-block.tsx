import { alertService } from "@features/alerts-block/service";
import { Alert } from '@mui/lab';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";

import { STYLES } from './constants';
import { IAlert } from './interfaces';

export const AlertsBlock = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const updateAlerts = () => {
    setAlerts(alertService.getAlerts());
  }

  const subscribeAlertUpdates = () => {
    alertService.subscribe(updateAlerts.bind(this));
  };

  useEffect(() => {
    subscribeAlertUpdates();
  }, []);

  return (
    <Box sx={STYLES.alertsWrapper}>
      {
        alerts.map((alert: IAlert) => {
          return <Alert severity={alert.type} sx={STYLES.alert}>{alert.message}</Alert>
        })
      }
    </Box>
  )
}
