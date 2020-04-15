import React from 'react';

import { SpellForm } from '../../components/form';
import { CreatePage } from '../../../components/create-page';
import endpoint from '../../store/createSpellForm';

const CreateSpellPage = () => (
  <CreatePage
    Form={SpellForm}
    endpoint={endpoint}
    mapData={data => data}
    resourceName="Spell"
  />
);

CreateSpellPage.defaultProps = {};

CreateSpellPage.propTypes = {};

export default CreateSpellPage;
