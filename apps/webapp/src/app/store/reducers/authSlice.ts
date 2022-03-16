import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Roles } from '@core/enums';
import { IAccount } from '@core/interfaces';
import { IAuthStore } from '@store/interfaces';

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

export const getUser = (store: IAuthStore) => store.value.user;
export const getIsAuthorized = (store: IAuthStore) => store.value?.isAuthorized;
export const getIsModerator = (store: IAuthStore) => {
  const { isAuthorized } = store.value;

  if(!isAuthorized) {
    return false;
  }

  return store.value.user?.role === Roles.MODERATOR;
}
export const getIsAdmin = (store: IAuthStore) => {
  const { isAuthorized } = store.value;

  if(!isAuthorized) {
    return false;
  }

  return store.value.user?.role === Roles.MODERATOR || store.value.user?.role === Roles.ADMIN;
}

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
