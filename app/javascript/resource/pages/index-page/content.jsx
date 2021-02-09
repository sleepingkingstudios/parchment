import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from 'components/status-switch';
import { injectProps } from 'utils/react';

const renderFailure = ({ Table, pluralDisplayName, resourceName }) => {
  const emptyMessage = (
    <span className="loading-message loading-message-failure">
      Unable to load {pluralDisplayName} data from the server.
    </span>
  );

  return injectProps(
    Table,
    {
      emptyMessage,
      pluralDisplayName,
      resourceName,
    },
  );
};
const renderPending = ({ Table, pluralDisplayName, resourceName }) => {
  const emptyMessage = (
    <span className="loading-message loading-message-pending">
      Loading {pluralDisplayName} data from the server...
    </span>
  );

  return injectProps(
    Table,
    {
      emptyMessage,
      pluralDisplayName,
      resourceName,
    },
  );
};
const renderSuccess = (props) => {
  const {
    Table,
    data,
    resourceName,
    pluralDisplayName,
    useDestroyRequest,
  } = props;

  const IndexPageTable = () => (
    <Table
      data={data}
      pluralDisplayName={pluralDisplayName}
      resourceName={resourceName}
      useDestroyRequest={useDestroyRequest}
    />
  );

  return IndexPageTable;
};

const IndexPageContent = (props) => {
  const {
    Table,
    data,
    pluralDisplayName,
    resourceName,
    status,
    useDestroyRequest,
  } = props;
  const failure = renderFailure({ Table, pluralDisplayName, resourceName });
  const pending = renderPending({ Table, pluralDisplayName, resourceName });
  const success = renderSuccess({
    Table,
    data,
    pluralDisplayName,
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
  pluralDisplayName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  useDestroyRequest: PropTypes.func,
};

export default IndexPageContent;
