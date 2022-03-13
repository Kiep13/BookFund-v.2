import { IAlertStore } from './alertStore.interface';
import { IConfirmationPopupStore } from './confirmationPopupStore.interface';

export interface IStore {
  alerts: IAlertStore,
  confirmationPopup: IConfirmationPopupStore
}
