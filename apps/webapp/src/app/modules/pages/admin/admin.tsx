import { Route } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import { wrapAdminPage } from '@features/page-wrapper';
import compose from '@shared/utils/compose';

import Authors from './authors';
import AuthorForm from './author-form';
import Books from './books';
import Genres from './genres';
import Dashboard from './dashboard';

export function App() {
  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} component={AuthorForm} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} component={Books}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} component={Genres}/>
    </>
  );
}

export default compose(
  wrapAdminPage()
)(App);
