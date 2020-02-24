import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Routes as ActionsRoutes } from './actions';

const Routes = () => (
  <Switch>
    <Route path="/mechanics/actions" component={ActionsRoutes} />
  </Switch>
);

export default Routes;
