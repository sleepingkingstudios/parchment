import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IndexConditionsPage } from './pages/index';
import { ShowConditionPage } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/mechanics/conditions/:id" component={ShowConditionPage} />
    <Route exact path="/mechanics/conditions" component={IndexConditionsPage} />
  </Switch>
);

export default Routes;
