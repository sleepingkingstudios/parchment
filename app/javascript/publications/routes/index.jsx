import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreatePublication from '../pages/create';
import ShowPublication from '../pages/show';
import PublicationsIndex from '../pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/publications/create" component={CreatePublication} />
    <Route exact path="/publications" component={PublicationsIndex} />
    <Route exact path="/publications/:id" component={ShowPublication} />
  </Switch>
);

export default Routes;
