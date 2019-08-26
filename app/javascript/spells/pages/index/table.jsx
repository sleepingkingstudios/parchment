import React from 'react';

import { LoaderSwitch } from '../../../components/loader';
import { SpellsTable } from '../../components/table';
import { hooks } from '../../store/indexFindSpells';

const renderFailure = () => (
  <p>Unable to load spells data from the server.</p>
);
const renderPending = () => (
  <p>Loading spells data from the server...</p>
);
const { useEndpoint } = hooks;

const IndexSpellsTable = () => {
  const { data, status } = useEndpoint();
  const { spells } = data;

  return (
    <LoaderSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<SpellsTable spells={spells} />)}
      status={status}
    />
  );
};

IndexSpellsTable.defaultProps = {};

IndexSpellsTable.propTypes = {};

export default IndexSpellsTable;
