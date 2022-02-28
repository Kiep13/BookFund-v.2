import { useState } from 'react';

import { DELAY } from '../constants';
import { AlertTypes } from '../enums';
import { IAlert } from '../interfaces';

export const useAlerts = () => {
  //импортировать алерт с редакса

  const [alerts,setAlerts] = useState<IAlert[]>([]);

  const addInfo = (message: string): void => {
    addAlert(message, AlertTypes.INFO);
  }

  const addSuccess = (message: string): void => {
    addAlert(message, AlertTypes.SUCCESS);
  }

  const addWarning = (message: string): void  => {
   addAlert(message, AlertTypes.WARNING);
  }

  const addError = (message: string): void => {
    addAlert(message, AlertTypes.ERROR);
  }

  const removeAlert = (id: number): void  => {
    const newAlerts = alerts.filter((alert: IAlert) => alert.id !== id);
    setAlerts(newAlerts);
  }

  const addAlert = (message: string, type: AlertTypes): void => {
    const newAlert: IAlert = {
      id: Date.now(),
      message,
      type: type,
      delay: DELAY,
      closable: false
    }

    console.log(alerts);

    setAlerts([
      ...alerts,
      newAlert
    ]);

    const timeout = setTimeout(() => {
      removeAlert(newAlert.id);
      clearTimeout(timeout);
    }, newAlert.delay);
  }

  return {alerts, addSuccess};
}
