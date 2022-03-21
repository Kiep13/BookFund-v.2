import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import { IProps } from './propsInterface';

export const ConfirmationPopup = ({info, isOpened, handleConfirm, handleClose}: IProps) =>
  <Dialog
    open={isOpened}
    onClose={() => handleClose()}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle>
      {info.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {info.text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose()}>Cancel</Button>
      <Button onClick={() => handleConfirm()} autoFocus>
        {info.confirmationButtonLabel}
      </Button>
    </DialogActions>
  </Dialog>
