import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import SpellBlock from './block';
import { spellType } from '../entities';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';

const generateBreadcrumbs = (spell) => {
  const label = (spell && spell.name) ? spell.name : 'Loading...';

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
      label,
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

const contents = ({ spell, status }) => {
  if (status === SUCCESS) {
    return (
      <SpellBlock spell={spell} />
    );
  }

  const message = emptyMessage(status);

  return (
    <p>{ message }</p>
  );
};

const ShowSpellPage = ({ spell, status }) => (
  <Page breadcrumbs={generateBreadcrumbs(spell)} className="page-spells">
    { contents({ spell, status }) }
  </Page>
);

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  spell: PropTypes.oneOfType([
    spellType,
    PropTypes.object,
  ]).isRequired,
  status: PropTypes.string.isRequired,
};

export default ShowSpellPage;
