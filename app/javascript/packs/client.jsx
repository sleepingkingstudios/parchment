/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Page from '../components/page';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Page title="Parchment" subtitle="5e Campaign Companion" />,
    document.body.appendChild(document.createElement('div')),
  );
});
