import { IConfirmationPopup } from '@utils/interfaces';

export interface IProps {
  info: IConfirmationPopup;
  isOpened: boolean;
  handleConfirm: Function;
  handleClose: Function;
}
