import { useDispatch, useSelector } from 'react-redux';

import { addAlert as addAlertAction, removeAlert as removeAlertAction } from '@store/subStates/alertsStore';

import { DELAY } from '../constants';
import { AlertTypes } from '../enums';
import { IAlert } from '../interfaces';

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

  const removeAlert = (id: number): void  => {
    dispatch(removeAlertAction(id));
  }

  const addAlert = (message: string, type: AlertTypes): void => {
    const newAlert: IAlert = {
      id: Date.now(),
      message,
      type: type,
      delay: DELAY,
      closable: false
    }

    dispatch(addAlertAction(newAlert));

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
