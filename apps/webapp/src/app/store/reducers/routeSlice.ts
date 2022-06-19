import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ROUTE_STORE_INITIAL_STATE } from '../constants';
import { IRouteStore, IStore } from '../interfaces';

export const routeSlice = createSlice({
  name: 'route',
  initialState: ROUTE_STORE_INITIAL_STATE,
  reducers: {
    addRoute: (state: IRouteStore, action: PayloadAction<string>) => {
      state.value = [
        ...state.value,
        action.payload
      ];
    }
  }
});

export const getRoutes = (store: IStore) => store.route.value;
export const getLastRoute = (store: IStore) => {
  return store.route.value.length ? store.route.value[store.route.value.length - 1] : null;
}
export const getPreviousRoute = (store: IStore) => {
  return store.route.value.length > 1 ? store.route.value[store.route.value.length - 2] : null;
}

export const { addRoute } = routeSlice.actions;
export default routeSlice.reducer;
