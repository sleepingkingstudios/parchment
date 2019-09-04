import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreatePublicationPage from '../pages/create';
import PublicationsIndex from '../pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/publications/create" component={CreatePublicationPage} />
    <Route exact path="/publications" component={PublicationsIndex} />
  </Switch>
);

export default Routes;
