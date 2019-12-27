import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { BookBlock } from '../../components/block';
import { hooks } from '../../store/showFindBook';

const renderFailure = () => (
  <p className="loading-message loading-message-failure">
    Unable to load book from the server.
  </p>
);
const renderPending = () => (
  <p className="loading-message loading-message-pending">
    Loading book from the server...
  </p>
);
const { useEndpoint } = hooks;

const ShowBookBlock = () => {
  const { data, status } = useEndpoint();
  const { book } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<BookBlock book={book} />)}
      status={status}
    />
  );
};

ShowBookBlock.defaultProps = {};

ShowBookBlock.propTypes = {};

export default ShowBookBlock;
