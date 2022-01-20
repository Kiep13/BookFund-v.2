import { Route } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import { wrapAdminPage } from '@features/page-wrapper';
import compose from '@shared/utils/compose';

import Authors from './authors';
import Books from './books';
import Dashboard from './dashboard';

export function App() {
  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} component={Books}/>
    </>
  );
}

export default compose(
  wrapAdminPage()
)(App);
