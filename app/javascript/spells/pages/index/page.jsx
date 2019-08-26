import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import Page from '../../../components/page';
import IndexSpellsTable from './table';
import { hooks } from '../../store/indexFindSpells';

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
const { usePerformRequest } = hooks;

const SpellsPage = () => {
  usePerformRequest()();

  return (
    <Page breadcrumbs={breadcrumbs} className="page-spells">
      <HeadingWithButtons buttons={buttons}>Spells</HeadingWithButtons>

      <IndexSpellsTable />
    </Page>
  );
};

SpellsPage.defaultProps = {};

SpellsPage.propTypes = {};

export default SpellsPage;
