import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as ActionsIndex } from './pages/index';
import { Page as ShowAction } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/mechanics/actions/:id" component={ShowAction} />
    <Route exact path="/mechanics/actions" component={ActionsIndex} />
  </Switch>
);

export default Routes;
