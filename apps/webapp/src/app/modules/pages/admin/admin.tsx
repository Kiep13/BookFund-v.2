import { Route } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import { wrapAdminPage } from '@features/page-wrapper';
import Authors from '@pages/admin/authors/authors';
import Dashboard from '@pages/admin/dashboard';
import compose from '@shared/utils/compose';

export function App() {
  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors}/>
    </>
  );
}

export default compose(
  wrapAdminPage()
)(App);
