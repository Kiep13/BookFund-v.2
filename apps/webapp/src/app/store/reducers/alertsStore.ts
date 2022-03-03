import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAlert } from '@features/alertsBlock/interfaces';

import { ALERT_STORE_INITIAL_STATE } from '../constants';
import { IAlertStore, IStore } from '../interfaces';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: ALERT_STORE_INITIAL_STATE,
  reducers: {
    addAlert: (state: IAlertStore, action: PayloadAction<IAlert>) => {
      state.value = [
        ...state.value,
        action.payload
      ];

      console.log(state);
    },
    removeAlert: (state: IAlertStore, action: PayloadAction<number>) => {
      const id = action.payload;
      state.value.filter((alert: IAlert) => alert.id !== id);
    }
  },
});

export const getAlerts = (store: IStore) => store.alerts.value;

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
