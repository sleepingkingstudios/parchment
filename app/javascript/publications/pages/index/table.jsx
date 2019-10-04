import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import PublicationsTable from '../../components/table';
import { hooks, request } from '../../store/indexFindPublications';

const renderFailure = () => (
  <p>Unable to load publications data from the server.</p>
);
const renderPending = () => (
  <p>Loading publications data from the server...</p>
);
const { useEndpoint } = hooks;
const { performRequest } = request;
const onDelete = ({ dispatch, getState }) => {
  performRequest()(dispatch, getState);
};

const IndexPublicationsTable = () => {
  const { data, status } = useEndpoint();
  const { publications } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (
        <PublicationsTable publications={publications} onDelete={onDelete} />
      )}
      status={status}
    />
  );
};

IndexPublicationsTable.defaultProps = {};

IndexPublicationsTable.propTypes = {};

export default IndexPublicationsTable;
