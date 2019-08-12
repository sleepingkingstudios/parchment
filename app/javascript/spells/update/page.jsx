import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import UpdateSpellForm from './form';
import { spellType } from '../entities';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';

const emptyBreadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Spells',
    url: '/spells',
  },
  {
    label: 'Loading...',
    active: true,
  },
];

const generateBreadcrumbs = (spell) => {
  if (!(spell && spell.name)) { return emptyBreadcrumbs; }

  return [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
    },
    {
      label: spell.name,
      url: `/spells/${spell.id}`,
    },
    {
      label: 'Update',
      active: true,
    },
  ];
};

const emptyMessage = (status) => {
  switch (status) {
    case INITIALIZED:
    case PENDING:
      return 'Loading spell from the server...';
    case FAILURE:
      return 'Spell not found.';
    default:
      return 'Unable to load spell from the server.';
  }
};

const contents = ({ status }) => {
  if (status === SUCCESS) {
    return (
      <Fragment>
        <h1>Update Spell</h1>

        <UpdateSpellForm isUpdate />
      </Fragment>
    );
  }

  const message = emptyMessage(status);

  return (
    <p>{ message }</p>
  );
};

const UpdateSpellPage = ({ spell, status }) => (
  <Page breadcrumbs={generateBreadcrumbs(spell)} className="page-spells">
    { contents({ status }) }
  </Page>
);

UpdateSpellPage.defaultProps = {};

UpdateSpellPage.propTypes = {
  spell: PropTypes.oneOfType([
    spellType,
    PropTypes.object,
  ]).isRequired,
  status: PropTypes.string.isRequired,
};

export default UpdateSpellPage;
