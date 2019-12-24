import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as BooksIndex } from './pages/index';

const Routes = () => (
  <Switch>
    <Route exact path="/books" component={BooksIndex} />
  </Switch>
);

export default Routes;
