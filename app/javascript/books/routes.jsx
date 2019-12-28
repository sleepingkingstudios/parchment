import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page as BooksIndex } from './pages/index';
import { Page as CreateBook } from './pages/create';
import { Page as ShowBook } from './pages/show';
import { Page as UpdateBook } from './pages/update';

const Routes = () => (
  <Switch>
    <Route exact path="/books" component={BooksIndex} />
    <Route exact path="/books/create" component={CreateBook} />
    <Route exact path="/books/:id" component={ShowBook} />
    <Route exact path="/books/:id/update" component={UpdateBook} />
  </Switch>
);

export default Routes;
