import { IAuthStore } from '../interfaces';

export const AUTH_STORE_INITIAL_STATE: IAuthStore = {
  value: {
    user: null,
    token: '',
    isAuthorized: false
  }
}
