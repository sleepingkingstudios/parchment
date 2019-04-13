/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Routes from '../routes';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />,
    document.body.appendChild(document.createElement('div')),
  );
});
