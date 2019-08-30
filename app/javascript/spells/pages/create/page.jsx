import React from 'react';

import Page from '../../../components/page';
import CreateSpellForm from './form';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Spells',
    url: '/spells',
  },
  {
    label: 'Create',
    url: '/spells/create',
    active: true,
  },
];

const CreateSpellPage = () => (
  <Page breadcrumbs={breadcrumbs} className="page-create-spell">
    <h1>Create Spell</h1>

    <CreateSpellForm />
  </Page>
);

CreateSpellPage.defaultProps = {};

CreateSpellPage.propTypes = {};

export default CreateSpellPage;
