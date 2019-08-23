import React from 'react';

import { connectLoader } from '../../../components/loader';
import IndexSpellsTable from './table';
import endpoint from '../../store/indexFindSpells';

const mapDataToProps = data => ({ spells: data.spells });
const ConnectedLoader = connectLoader(endpoint);

const IndexSpellsTableLoader = () => (
  <ConnectedLoader
    mapDataToProps={mapDataToProps}
    render={IndexSpellsTable}
  />
);

export default IndexSpellsTableLoader;
