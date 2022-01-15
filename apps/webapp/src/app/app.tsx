import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from "./modules/pages/admin/dashboard";
import Home from './modules/pages/base/home';

function App() {
  return (
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  );
}

export default App;
