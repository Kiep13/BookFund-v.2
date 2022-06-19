import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './reducers/alertsSlice';
import authReducer from './reducers/authSlice';
import routeReducer from './reducers/routeSlice';

export default configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
    route: routeReducer
  }
});
