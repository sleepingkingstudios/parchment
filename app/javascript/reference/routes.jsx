import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Routes as ItemsRoutes } from './items';
import { Routes as LanguagesRoutes } from './languages';
import { Routes as SkillsRoutes } from './skills';

const Routes = () => (
  <Switch>
    <Route path="/reference/items" component={ItemsRoutes} />
    <Route path="/reference/languages" component={LanguagesRoutes} />
    <Route path="/reference/skills" component={SkillsRoutes} />
  </Switch>
);

export default Routes;
