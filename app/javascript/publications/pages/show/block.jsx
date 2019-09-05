import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import PublicationBlock from '../../components/block';
import { hooks } from '../../store/showFindPublication';

const renderFailure = () => (
  <p>Unable to load publication from the server.</p>
);
const renderPending = () => (
  <p>Loading publication from the server...</p>
);
const { useEndpoint } = hooks;

const ShowPublicationBlock = () => {
  const { data, status } = useEndpoint();
  const { publication } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (
        <PublicationBlock publication={publication} showAdditionalDetails />
      )}
      status={status}
    />
  );
};

ShowPublicationBlock.defaultProps = {};

ShowPublicationBlock.propTypes = {};

export default ShowPublicationBlock;
