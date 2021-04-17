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
    actions,
    baseUrl,
    data,
    mapData,
    resourceName,
    pluralDisplayName,
    useDestroyRequest,
  } = props;

  const IndexPageTable = () => (
    <Table
      actions={actions}
      baseUrl={baseUrl}
      data={data}
      mapData={mapData}
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
    actions,
    baseUrl,
    data,
    mapData,
    pluralDisplayName,
    resourceName,
    status,
    useDestroyRequest,
  } = props;
  const failure = renderFailure({ Table, pluralDisplayName, resourceName });
  const pending = renderPending({ Table, pluralDisplayName, resourceName });
  const success = renderSuccess({
    Table,
    actions,
    baseUrl,
    data,
    mapData,
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
  mapData: null,
  useDestroyRequest: null,
};

IndexPageContent.propTypes = {
  Table: PropTypes.elementType.isRequired,
  baseUrl: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  mapData: PropTypes.func,
  pluralDisplayName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  useDestroyRequest: PropTypes.func,
};

export default IndexPageContent;
