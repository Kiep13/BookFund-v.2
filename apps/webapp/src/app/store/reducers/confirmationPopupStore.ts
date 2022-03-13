import { IConfirmationPopup } from '@features/confirmationPopup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CONFIRMATION_POPUP_INITIAL_STATE } from '../constants';
import { IConfirmationPopupStore, IStore } from '../interfaces';

export const confirmationPopupStore = createSlice({
  name: 'confirmationPopup',
  initialState: CONFIRMATION_POPUP_INITIAL_STATE,
  reducers: {
    openConfirmationPopup: (state: IConfirmationPopupStore, action: PayloadAction<IConfirmationPopup>) => {
      state.value = {
        ...action.payload,
        isOpened: true,
      };
    },
    confirm: (state: IConfirmationPopupStore) => {
      state.value = CONFIRMATION_POPUP_INITIAL_STATE.value;
    },
    cancel: (state: IConfirmationPopupStore) => {
      state.value = CONFIRMATION_POPUP_INITIAL_STATE.value;
    },
  }
});

export const getConfirmationPopup = (store: IStore) => store.confirmationPopup.value;

export const { openConfirmationPopup, cancel, confirm } = confirmationPopupStore.actions;
export default confirmationPopupStore.reducer;
