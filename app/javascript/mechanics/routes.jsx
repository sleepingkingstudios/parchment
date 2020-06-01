import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Routes as ActionsRoutes } from './actions';
import { Routes as ConditionsRoutes } from './conditions';

const Routes = () => (
  <Switch>
    <Route path="/mechanics/actions" component={ActionsRoutes} />
    <Route path="/mechanics/conditions" component={ConditionsRoutes} />
  </Switch>
);

export default Routes;
