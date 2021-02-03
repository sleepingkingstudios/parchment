import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from 'components/status-switch';
import { injectProps } from 'utils/react';

const renderFailure = ({ Table, resourceName }) => {
  const emptyMessage = (
    <span className="loading-message loading-message-failure">
      Unable to load {resourceName} data from the server.
    </span>
  );

  return injectProps(
    Table,
    {
      emptyMessage,
      resourceName,
    },
  );
};
const renderPending = ({ Table, resourceName }) => {
  const emptyMessage = (
    <span className="loading-message loading-message-pending">
      Loading {resourceName} data from the server...
    </span>
  );

  return injectProps(
    Table,
    {
      emptyMessage,
      resourceName,
    },
  );
};
const renderSuccess = (props) => {
  const {
    Table,
    data,
    resourceName,
    useDestroyRequest,
  } = props;

  const IndexPageTable = () => (
    <Table data={data} resourceName={resourceName} useDestroyRequest={useDestroyRequest} />
  );

  return IndexPageTable;
};

const IndexPageContent = (props) => {
  const {
    Table,
    data,
    resourceName,
    status,
    useDestroyRequest,
  } = props;
  const failure = renderFailure({ Table, resourceName });
  const pending = renderPending({ Table, resourceName });
  const success = renderSuccess({
    Table,
    data,
    resourceName,
    useDestroyRequest,
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

IndexPageContent.defaultProps = {
  useDestroyRequest: null,
};

IndexPageContent.propTypes = {
  Table: PropTypes.elementType.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  resourceName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  useDestroyRequest: PropTypes.func,
};

export default IndexPageContent;
