import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IndexLanguagesPage } from './pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/reference/languages" component={IndexLanguagesPage} />
  </Switch>
);

export default Routes;
