/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import Routes from '../routes';
import store from '../store';

const Client = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Client />,
    document.body.appendChild(document.createElement('div')),
  );
});
