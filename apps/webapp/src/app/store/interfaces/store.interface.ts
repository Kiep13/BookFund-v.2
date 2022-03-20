import { IAlertStore } from './alertStore.interface';
import { IAuthStore } from './authStore.interface';

export interface IStore {
  alerts: IAlertStore,
  auth: IAuthStore
}
