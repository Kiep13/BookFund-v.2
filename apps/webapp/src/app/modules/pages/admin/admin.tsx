import Dashboard from '@pages/admin/dashboard';
import { Route } from 'react-router-dom';
import * as React from 'react';

export default function App(props: any) {
  return (
    <Route path={`${props.match.path}`} component={Dashboard}/>
  );
}
