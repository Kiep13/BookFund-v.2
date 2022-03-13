import { useDispatch } from 'react-redux';

import { cancel, confirm, openConfirmationPopup } from '@store/reducers';

import { IConfirmationPopup } from '../interfaces';

export const useConfirmationPopup = () => {
  const dispatch = useDispatch();

  const openPopup = (confirmationPopup: IConfirmationPopup) => {
    dispatch(openConfirmationPopup(confirmationPopup));
  }

  const confirmPopup = (() => {
    dispatch(confirm());
  })

  const closePopup = () => {
    dispatch(cancel());
  }

  return {
    openPopup,
    closePopup
  }
}
