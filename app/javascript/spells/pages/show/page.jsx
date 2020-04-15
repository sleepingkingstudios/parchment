import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../components/show-page';

import { SpellBlock } from '../../components/block';
import endpoint from '../../store/showFindSpell';
import deleteEndpoint from '../../store/deleteSpell';

const ShowSpellPage = ({ match }) => (
  <ShowPage
    Block={SpellBlock}
    deleteEndpoint={deleteEndpoint}
    endpoint={endpoint}
    match={match}
    resourceName="Spell"
  />
);

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowSpellPage;
