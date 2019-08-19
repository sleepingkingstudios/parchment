import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import Page from '../../../components/page';
import IndexSpellsTableLoader from './loader';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Spells',
    url: '/spells',
    active: true,
  },
];

const buttons = [
  {
    label: 'Create Spell',
    outline: true,
    url: '/spells/create',
  },
];

const SpellsPage = () => (
  <Page breadcrumbs={breadcrumbs} className="page-spells">
    <HeadingWithButtons buttons={buttons}>Spells</HeadingWithButtons>

    <IndexSpellsTableLoader />
  </Page>
);

SpellsPage.defaultProps = {};

SpellsPage.propTypes = {};

export default SpellsPage;
