import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertsStore';
import authReducer from './reducers/authSlice';

export default configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer
  }
});
