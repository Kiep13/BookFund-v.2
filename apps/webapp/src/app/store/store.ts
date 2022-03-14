import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertsStore';

export default configureStore({
  reducer: {
    alerts: alertReducer
  }
});
