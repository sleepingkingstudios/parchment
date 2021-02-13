import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from 'components/status-switch';

const renderFailure = ({ singularDisplayName }) => {
  const ShowPageFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Unable to load {singularDisplayName} data from the server.
    </p>
  );

  return ShowPageFailureMessage;
};
const renderPending = ({ singularDisplayName }) => {
  const ShowPagePendingMessage = () => (
    <p className="loading-message loading-message-pending">
      Loading {singularDisplayName} data from the server...
    </p>
  );

  return ShowPagePendingMessage;
};
const renderSuccess = (props) => {
  const {
    Block,
    data,
  } = props;

  const ShowPageBlock = () => (
    <Block data={data} showAdditionalDetails />
  );

  return ShowPageBlock;
};

const ShowPageContent = (props) => {
  const {
    Block,
    data,
    singularDisplayName,
    status,
  } = props;
  const failure = renderFailure({ singularDisplayName });
  const pending = renderPending({ singularDisplayName });
  const success = renderSuccess({
    Block,
    data,
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
  singularDisplayName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ShowPageContent;
