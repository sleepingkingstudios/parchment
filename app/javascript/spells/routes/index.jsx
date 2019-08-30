import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as CreateSpell } from '../pages/create';
import { Page as ShowSpell } from '../pages/show';
import { Page as SpellsIndex } from '../pages/index';
import UpdateSpell from '../update';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={SpellsIndex} />
    <Route exact path="/spells/create" component={CreateSpell} />
    <Route exact path="/spells/:id" component={ShowSpell} />
    <Route exact path="/spells/:id/update" component={UpdateSpell} />
  </Switch>
);

export default Routes;
