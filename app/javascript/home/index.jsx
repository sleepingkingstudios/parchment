import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Page from '../components/page';

const HomePage = props => (
  <Page {...props}>
    <h1>Game Resources</h1>

    <ul>
      <li>
        <Link className="spells-link" to="/spells">Spells</Link>
      </li>
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
