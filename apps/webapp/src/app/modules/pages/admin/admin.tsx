import { Route } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import Dashboard from '@pages/admin/dashboard';

export default function App() {
  return (
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
  );
}
