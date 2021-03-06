import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateItemPage } from './pages/create';
import { IndexItemsPage } from './pages/index';
import { ShowItemPage } from './pages/show';
import { UpdateItemPage } from './pages/update';

const Routes = () => (
  <Switch>
    <Route exact path="/reference/items/create" component={CreateItemPage} />
    <Route exact path="/reference/items/:id/update" component={UpdateItemPage} />
    <Route exact path="/reference/items/:id" component={ShowItemPage} />
    <Route exact path="/reference/items" component={IndexItemsPage} />
  </Switch>
);

export default Routes;
