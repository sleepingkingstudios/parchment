import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../home';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;
