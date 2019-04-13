import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SpellsPage from '../page';

const Routes = () => (
  <Switch>
    <Route path="/spells" component={SpellsPage} />
  </Switch>
);

export default Routes;
