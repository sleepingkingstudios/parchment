import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as ActionsIndex } from './pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/mechanics/actions" component={ActionsIndex} />
  </Switch>
);

export default Routes;
