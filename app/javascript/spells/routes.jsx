import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as UpdatePage } from './pages/update-page';
import { Page as CreatePage } from './pages/create-page';
import { Page as IndexPage } from './pages/index-page';
import { Page as ShowPage } from './pages/show-page';

const Routes = () => (
  <Switch>
    <Route exact path="/spells" component={IndexPage} />
    <Route exact path="/spells/create" component={CreatePage} />
    <Route exact path="/spells/:id" component={ShowPage} />
    <Route exact path="/spells/:id/update" component={UpdatePage} />
  </Switch>
);

export default Routes;
