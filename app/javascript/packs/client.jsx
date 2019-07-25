/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import Routes from '../routes';
import store, { history } from '../store';

const Client = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Client />,
    document.body.appendChild(document.createElement('div')),
  );
});
