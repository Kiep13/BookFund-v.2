import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminRoutePaths, BaseRoutePaths } from '@core/enums';
import { AlertsBlock } from '@features/alerts-block';
import { Admin } from '@pages/admin';
import { Home } from '@pages/base/home';

function App() {
  return (
    <>
      <AlertsBlock/>
      <Switch>
        <Route path={BaseRoutePaths.HOME} component={Home} exact/>
        <Route path={AdminRoutePaths.ADMIN} component={Admin}/>
      </Switch>
    </>

  );
}

export default App;
