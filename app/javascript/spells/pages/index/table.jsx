import React from 'react';
import PropTypes from 'prop-types';

import { LoaderSwitch } from '../../../components/loader';
import { SpellsTable } from '../../components/table';
import { spellListType } from '../../entities';

const renderFailure = () => (
  <p>Unable to load spells data from the server.</p>
);
const renderPending = () => (
  <p>Loading spells data from the server...</p>
);

const IndexSpellsTable = props => (
  <LoaderSwitch
    {...props}
    renderFailure={renderFailure}
    renderInitialized={renderPending}
    renderPending={renderPending}
    renderSuccess={SpellsTable}
  />
);

IndexSpellsTable.defaultProps = {};

IndexSpellsTable.propTypes = {
  spells: spellListType.isRequired,
  status: PropTypes.string.isRequired,
};

export default IndexSpellsTable;
