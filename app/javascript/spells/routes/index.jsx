import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Spells from '../index';

const Routes = () => (
  <Switch>
    <Route path="/spells" component={Spells} />
  </Switch>
);

export default Routes;
