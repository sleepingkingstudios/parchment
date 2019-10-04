import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { SpellsTable } from '../../components/table';
import { hooks, request } from '../../store/indexFindSpells';

const renderFailure = () => (
  <p>Unable to load spells data from the server.</p>
);
const renderPending = () => (
  <p>Loading spells data from the server...</p>
);
const { useEndpoint } = hooks;
const { performRequest } = request;
const onDelete = ({ dispatch, getState }) => {
  performRequest()(dispatch, getState);
};

const IndexSpellsTable = () => {
  const { data, status } = useEndpoint();
  const { spells } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<SpellsTable spells={spells} onDelete={onDelete} />)}
      status={status}
    />
  );
};

IndexSpellsTable.defaultProps = {};

IndexSpellsTable.propTypes = {};

export default IndexSpellsTable;
