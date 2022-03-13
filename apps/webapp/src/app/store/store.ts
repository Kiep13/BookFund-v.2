import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertsStore';
import confirmationPopupStore from './reducers/confirmationPopupStore';

export default configureStore({
  reducer: {
    alerts: alertReducer,
    confirmationPopup: confirmationPopupStore
  }
});
