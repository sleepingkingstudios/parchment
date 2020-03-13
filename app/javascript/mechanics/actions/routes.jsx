import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateActionPage } from './pages/create';
import { IndexActionsPage } from './pages/index';
import { ShowActionPage } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/mechanics/actions/create" component={CreateActionPage} />
    <Route exact path="/mechanics/actions/:id" component={ShowActionPage} />
    <Route exact path="/mechanics/actions" component={IndexActionsPage} />
  </Switch>
);

export default Routes;
