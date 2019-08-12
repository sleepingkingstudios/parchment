import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateSpell from '../create';
import ShowSpell from '../show';
import Spells from '../index';
import UpdateSpell from '../update';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={Spells} />
    <Route exact path="/spells/create" component={CreateSpell} />
    <Route exact path="/spells/:id" component={ShowSpell} />
    <Route exact path="/spells/:id/update" component={UpdateSpell} />
  </Switch>
);

export default Routes;
