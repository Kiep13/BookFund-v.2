import { IConfirmationPopup } from './interfaces';

export interface IProps {
  info: IConfirmationPopup
  isOpened: boolean,
  handleConfirm: Function,
  handleClose: Function
}
