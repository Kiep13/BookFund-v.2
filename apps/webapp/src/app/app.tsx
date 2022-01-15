import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Admin from '@pages/admin';
import Home from '@pages/base/home';

function App() {
  return (
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/admin' component={Admin}/>
    </Switch>
  );
}

export default App;
