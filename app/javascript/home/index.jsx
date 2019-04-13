import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/page';

const HomePage = props => (
  <Page {...props}>
    <h1>Resources</h1>

    <ul>
      <li>Spells</li>
    </ul>
  </Page>
);

HomePage.defaultProps = {
  children: null,
  className: null,
  layout: null,
  subtitle: '5e Campaign Companion',
  title: 'Parchment',
};

HomePage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default HomePage;
