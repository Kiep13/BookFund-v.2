import { IConfirmationPopupStore } from '../interfaces';

export const CONFIRMATION_POPUP_INITIAL_STATE: IConfirmationPopupStore = {
  value: {
    title: '',
    text: '',
    confirmationButtonLabel: '',
    isOpened: false,
  },
}
