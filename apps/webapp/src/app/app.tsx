import { CssBaseline  }from '@mui/material';
import { Provider } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@core/enums';
import { Authorizing, Login } from '@pages/auth';
import { AlertsBlock } from '@features/alertsBlock';
import { Admin } from '@pages/admin';
import { Home } from '@pages/base/home';
import { Articles } from '@pages/user/articles';
import { Favorites } from '@pages/user/favorites';
import store from '@store/store';

const App = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(AuthRoutePaths.REFRESH);
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline/>
      <AlertsBlock/>
      <Switch>
        <Route path={BaseRoutePaths.HOME} component={Home} exact/>
        <Route path={BaseRoutePaths.FAVORITES} component={Favorites}/>
        <Route path={BaseRoutePaths.ARTICLES} component={Articles}/>
        <Route path={`${AuthRoutePaths.REFRESH}`} component={Authorizing}/>
        <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} component={Authorizing}/>
        <Route path={AuthRoutePaths.LOGIN} component={Login}/>
        <Route path={AdminRoutePaths.ADMIN} component={Admin}/>
      </Switch>
    </Provider>
  );
}

export default App;
