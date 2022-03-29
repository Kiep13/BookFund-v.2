import { CssBaseline  }from '@mui/material';
import { Provider } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { AlertsBlock } from '@components/AlertsBlock';
import { Authorizing, Login } from '@pages/auth';
import { Admin } from '@pages/admin';
import { Author, Book, Collection, Home, Search } from '@pages/base';
import { Articles } from '@pages/user/Articles';
import { Favorites } from '@pages/user/Favorites';
import store from '@store/index';
import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@utils/enums';

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
        <Route path={`${BaseRoutePaths.SEARCH}/:searchTerm`} component={Search}/>

        <Route path={`${BaseRoutePaths.AUTHOR}/:id`} component={Author}/>
        <Route path={`${BaseRoutePaths.BOOK}/:id`} component={Book}/>
        <Route path={`${BaseRoutePaths.COLLECTION}/:id`} component={Collection}/>

        <Route path={`${AuthRoutePaths.REFRESH}`} component={Authorizing}/>
        <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} component={Authorizing}/>
        <Route path={AuthRoutePaths.LOGIN} component={Login}/>

        <Route path={AdminRoutePaths.ADMIN} component={Admin}/>
      </Switch>
    </Provider>
  );
}

export default App;
