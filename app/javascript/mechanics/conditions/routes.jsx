import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateConditionPage } from './pages/create';
import { IndexConditionsPage } from './pages/index';
import { ShowConditionPage } from './pages/show';
import { UpdateConditionPage } from './pages/update';

const Routes = () => (
  <Switch>
    <Route exact path="/mechanics/conditions/create" component={CreateConditionPage} />
    <Route exact path="/mechanics/conditions/:id/update" component={UpdateConditionPage} />
    <Route exact path="/mechanics/conditions/:id" component={ShowConditionPage} />
    <Route exact path="/mechanics/conditions" component={IndexConditionsPage} />
  </Switch>
);

export default Routes;
