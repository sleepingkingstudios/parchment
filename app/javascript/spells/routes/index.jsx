import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Spells from '../index';
import ShowSpell from '../show';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={Spells} />
    <Route path="/spells/:id" component={ShowSpell} />
  </Switch>
);

export default Routes;
