import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IndexSkillsPage } from './pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/reference/skills" component={IndexSkillsPage} />
  </Switch>
);

export default Routes;
