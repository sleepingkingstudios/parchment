import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from 'components/status-switch';

const renderFailure = ({ resourceName }) => {
  const ShowPageFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Unable to load {resourceName} data from the server.
    </p>
  );

  return ShowPageFailureMessage;
};
const renderPending = ({ resourceName }) => {
  const ShowPagePendingMessage = () => (
    <p className="loading-message loading-message-pending">
      Loading {resourceName} data from the server...
    </p>
  );

  return ShowPagePendingMessage;
};
const renderSuccess = (props) => {
  const {
    Block,
    data,
    resourceName,
  } = props;

  const ShowPageBlock = () => (
    <Block data={data} resourceName={resourceName} showAdditionalDetails />
  );

  return ShowPageBlock;
};

const ShowPageContent = (props) => {
  const {
    Block,
    data,
    resourceName,
    status,
  } = props;
  const failure = renderFailure({ resourceName });
  const pending = renderPending({ resourceName });
  const success = renderSuccess({
    Block,
    data,
    resourceName,
  });

  return (
    <StatusSwitch
      renderFailure={failure}
      renderInitialized={pending}
      renderPending={pending}
      renderSuccess={success}
      status={status}
    />
  );
};

ShowPageContent.defaultProps = {};

ShowPageContent.propTypes = {
  Block: PropTypes.elementType.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  resourceName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ShowPageContent;
