import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAlert } from '@components/alertsBlock/interfaces';

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
    },
    removeAlert: (state: IAlertStore, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.value.findIndex((alert: IAlert) => alert.id === id);

      state.value = [
        ...state.value.slice(0, index),
        ...state.value.slice(index + 1, state.value.length)
      ]
    }
  },
});

export const getAlerts = (store: IStore) => store.alerts.value;

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
