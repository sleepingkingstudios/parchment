import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Routes as SkillsRoutes } from './skills';

const Routes = () => (
  <Switch>
    <Route path="/reference/skills" component={SkillsRoutes} />
  </Switch>
);

export default Routes;
