import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateSpell from '../create';
import ShowSpell from '../show';
import Spells from '../index';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={Spells} />
    <Route exact path="/spells/create" component={CreateSpell} />
    <Route path="/spells/:id" component={ShowSpell} />
  </Switch>
);

export default Routes;
