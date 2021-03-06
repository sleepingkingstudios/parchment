import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IndexLanguagesPage } from './pages/index';
import { ShowLanguagePage } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/reference/languages/:id" component={ShowLanguagePage} />
    <Route exact path="/reference/languages" component={IndexLanguagesPage} />
  </Switch>
);

export default Routes;
