import { IAlertStore } from './alertStoreInterface';
import { IAuthStore } from './authStoreInterface';
import { IRouteStore } from './routeStoreInterface';

export interface IStore {
  alerts: IAlertStore,
  auth: IAuthStore,
  route: IRouteStore
}
