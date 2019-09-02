import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PublicationsIndex from '../pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/publications" component={PublicationsIndex} />
  </Switch>
);

export default Routes;
