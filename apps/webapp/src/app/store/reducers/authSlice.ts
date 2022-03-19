import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Roles } from '@core/enums';
import { IAccount } from '@core/interfaces';
import { IAuthStore, IStore } from '@store/interfaces';

import { AUTH_STORE_INITIAL_STATE } from '../constants';

export const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_STORE_INITIAL_STATE,
  reducers: {
    login: (state: IAuthStore, action: PayloadAction<IAccount>) => {
      state.value = {
        user: action.payload,
        isAuthorized: true
      }
    },
    logout: (state: IAuthStore) => {
      state.value = {
        user: null,
        isAuthorized: false
      }
    }
  }
});

export const getUser = (store: IStore) => store.auth.value.user;
export const getIsAuthorized = (store: IStore) => store.auth.value?.isAuthorized;
export const getIsModerator = (store: IStore) => {
  const { isAuthorized } = store.auth.value;

  if(!isAuthorized) {
    return false;
  }

  return store.auth.value.user?.role === Roles.MODERATOR;
}
export const getIsAdmin = (store: IStore) => {
  const { isAuthorized } = store.auth.value;

  if(!isAuthorized) {
    return false;
  }

  return store.auth.value.user?.role === Roles.MODERATOR || store.auth.value.user?.role === Roles.ADMIN;
}

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
