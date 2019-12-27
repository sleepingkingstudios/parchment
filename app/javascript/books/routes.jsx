import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as BooksIndex } from './pages/index';
import { Page as ShowBook } from './pages/show';

const Routes = () => (
  <Switch>
    <Route exact path="/books" component={BooksIndex} />
    <Route exact path="/books/:id" component={ShowBook} />
  </Switch>
);

export default Routes;
