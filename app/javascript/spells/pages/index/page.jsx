import React from 'react';

import { IndexPage } from '../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindSpells';

const IndexSpellsPage = () => (
  <IndexPage columns={columns} endpoint={endpoint} resourceName="Spell" />
);

IndexSpellsPage.defaultProps = {};

IndexSpellsPage.propTypes = {};

export default IndexSpellsPage;
