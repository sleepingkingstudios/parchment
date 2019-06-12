import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import SpellForm from '../form';

import { spellType } from '../entities';

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

const CreateSpellPage = ({
  createSpellRequestStatus,
  draftSpell,
  requestCreateSpell,
  updateSpellFormField,
}) => (
  <Page breadcrumbs={breadcrumbs} className="page-spells page-create-spell">
    <h1>Create Spell</h1>

    <SpellForm
      requestStatus={createSpellRequestStatus}
      spell={draftSpell}
      onChangeAction={updateSpellFormField}
      onSubmitAction={requestCreateSpell}
    />
  </Page>
);

CreateSpellPage.defaultProps = {};

CreateSpellPage.propTypes = {
  createSpellRequestStatus: PropTypes.string.isRequired,
  draftSpell: spellType.isRequired,
  requestCreateSpell: PropTypes.func.isRequired,
  updateSpellFormField: PropTypes.func.isRequired,
};

export default CreateSpellPage;
