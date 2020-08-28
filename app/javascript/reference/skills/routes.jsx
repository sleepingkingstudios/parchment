import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IndexSkillsPage } from './pages/index';
import { ShowSkillPage } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/reference/skills/:id" component={ShowSkillPage} />
    <Route exact path="/reference/skills" component={IndexSkillsPage} />
  </Switch>
);

export default Routes;
