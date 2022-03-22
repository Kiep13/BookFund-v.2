import { IAlertStore } from './alertStoreInterface';
import { IAuthStore } from './authStoreInterface';

export interface IStore {
  alerts: IAlertStore,
  auth: IAuthStore
}
