import React from 'react';

import DynamicTable from '../../../components/dynamic-table';
import { IndexPage } from '../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindSpells';

const IndexSpellsPage = () => (
  <IndexPage Table={DynamicTable} columns={columns} endpoint={endpoint} resourceName="Spell" />
);

IndexSpellsPage.defaultProps = {};

IndexSpellsPage.propTypes = {};

export default IndexSpellsPage;
