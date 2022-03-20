import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import * as alertStore from '@store/reducers/alertsStore';

import { DELAY } from '@utils/constants';
import { AlertTypes } from '@utils/enums';
import { IAlert } from '@utils/interfaces';

export const useAlerts = () => {
  const dispatch = useDispatch();

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

  const removeAlert = (id: string): void  => {
    dispatch(alertStore.removeAlert(id));
  }

  const addAlert = (message: string, type: AlertTypes): void => {
    const newAlert: IAlert = {
      id: uuid(),
      message,
      type: type,
      delay: DELAY,
      closable: false
    }

    dispatch(alertStore.addAlert(newAlert));

    const timeout = setTimeout(() => {
      removeAlert(newAlert.id);
      clearTimeout(timeout);
    }, newAlert.delay);
  }

  return {
    addInfo,
    addSuccess,
    addWarning,
    addError
  };
}
