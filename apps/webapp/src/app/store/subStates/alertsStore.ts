import { createSlice } from '@reduxjs/toolkit';

import { IAlert } from '@features/alertsBlock/interfaces';
import { IStore } from "@store/interfaces";

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    addAlert: (state: IAlert[], action) => {
      state = [
        ...state,
        action.payload
      ];

      console.log(state);
    },
    removeAlert: (state: IAlert[], action) => {
      const { id } = action.payload;
      state.filter((alert: IAlert) => alert.id !== id);
    }
  },
});

export const getAlerts = (store: IStore) => store.alerts;

export const { addAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
