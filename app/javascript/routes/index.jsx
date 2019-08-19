import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { Routes as SpellsRoutes } from '../spells';
import HomePage from '../home';

const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/spells" component={SpellsRoutes} />
      <Route path="/" component={HomePage} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
