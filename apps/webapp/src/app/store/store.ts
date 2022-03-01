import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './subStates/alertsStore';

export default configureStore({
  reducer: {
    alerts: alertReducer
  }
});
