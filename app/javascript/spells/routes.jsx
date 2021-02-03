import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateSpellPage } from './pages/create';
import { ShowSpellPage } from './pages/show';
import { Page as UpdateSpell } from './pages/update';
import { Page as IndexPage } from './pages/index-page';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={IndexPage} />
    <Route exact path="/spells/create" component={CreateSpellPage} />
    <Route exact path="/spells/:id" component={ShowSpellPage} />
    <Route exact path="/spells/:id/update" component={UpdateSpell} />
  </Switch>
);

export default Routes;
