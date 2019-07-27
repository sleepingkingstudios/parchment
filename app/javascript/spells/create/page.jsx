import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import SpellForm from '../form';

import { formErrorsType } from '../../components/form/entities';
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
  data,
  errors,
  performRequest,
  requestStatus,
  updateFormField,
}) => (
  <Page breadcrumbs={breadcrumbs} className="page-spells page-create-spell">
    <h1>Create Spell</h1>

    <SpellForm
      data={data}
      errors={errors}
      requestStatus={requestStatus}
      onChangeAction={updateFormField}
      onSubmitAction={performRequest}
    />
  </Page>
);

CreateSpellPage.defaultProps = {};

CreateSpellPage.propTypes = {
  data: spellType.isRequired,
  errors: formErrorsType.isRequired,
  performRequest: PropTypes.func.isRequired,
  requestStatus: PropTypes.string.isRequired,
  updateFormField: PropTypes.func.isRequired,
};

export default CreateSpellPage;
