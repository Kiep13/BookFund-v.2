import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { AdminRoutePaths, BaseRoutePaths } from '@core/enums';
import { AlertsBlock } from '@features/alertsBlock';
import { Admin } from '@pages/admin';
import { Home } from '@pages/base/home';
import { Articles } from '@pages/user/articles';
import { Favorites } from '@pages/user/favorites';
import store from '@store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AlertsBlock/>
      <Switch>
        <Route path={BaseRoutePaths.HOME} component={Home} exact/>
        <Route path={BaseRoutePaths.FAVORITES} component={Favorites}/>
        <Route path={BaseRoutePaths.ARTICLES} component={Articles}/>
        <Route path={AdminRoutePaths.ADMIN} component={Admin}/>
      </Switch>
    </Provider>
  );
}

export default App;
