import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/page';

const SpellsPage = props => (
  <Page {...props}>
    <h1>Spells</h1>
  </Page>
);

SpellsPage.defaultProps = {
  children: null,
  className: null,
  layout: null,
  subtitle: '5e Campaign Companion',
  title: 'Parchment',
};

SpellsPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  spells: PropTypes.arrayOf(PropTypes.object).isRequired,
  subtitle: PropTypes.string,
  spellsRequestStatus: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default SpellsPage;
