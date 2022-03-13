import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useSelector } from 'react-redux';

import { getConfirmationPopup } from '@store/reducers';

import { useConfirmationPopup } from './hooks';

export const ConfirmationPopup = () => {
  const confirmationPopup = useSelector(getConfirmationPopup);
  const confirmationPopupActions = useConfirmationPopup();

  const handleConfirmation = () => {
    confirmationPopupActions.closePopup();
  }

  return (
    <Dialog
      open={confirmationPopup.isOpened || false}
      onClose={confirmationPopupActions.closePopup}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle>
        { confirmationPopup.title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { confirmationPopup.text }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmationPopupActions.closePopup}>Cancel</Button>
        <Button onClick={handleConfirmation} autoFocus>
          { confirmationPopup.confirmationButtonLabel }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
