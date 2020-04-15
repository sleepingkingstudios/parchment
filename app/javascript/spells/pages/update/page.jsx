import React from 'react';
import PropTypes from 'prop-types';

import { SpellForm } from '../../components/form';
import { UpdatePage } from '../../../components/update-page';
import findEndpoint from '../../store/updateFindSpell';
import formEndpoint from '../../store/updateSpellForm';

const UpdateSpellPage = ({ match }) => (
  <UpdatePage
    Form={SpellForm}
    findEndpoint={findEndpoint}
    formEndpoint={formEndpoint}
    mapData={data => data}
    mapResource={data => data.spell}
    match={match}
    resourceName="Spell"
  />
);

UpdateSpellPage.defaultProps = {};

UpdateSpellPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateSpellPage;
