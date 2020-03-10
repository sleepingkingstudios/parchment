import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateBookPage } from './pages/create';
import { IndexBooksPage } from './pages/index';
import { ShowBookPage } from './pages/show';
import { Page as UpdateBook } from './pages/update';

const Routes = () => (
  <Switch>
    <Route exact path="/books" component={IndexBooksPage} />
    <Route exact path="/books/create" component={CreateBookPage} />
    <Route exact path="/books/:id" component={ShowBookPage} />
    <Route exact path="/books/:id/update" component={UpdateBook} />
  </Switch>
);

export default Routes;
