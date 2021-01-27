import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import StatusSwitch from '../status-switch';
import BasicTable from '../table';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const defaultMapData = resourceName => data => (data[resourceName]);
const emptyMessage = resourceName => (
  `There are no ${resourceName} matching the criteria.`
);
const renderFailure = (resourceName) => {
  const IndexPageTableFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Unable to load {resourceName} data from the server.
    </p>
  );

  return IndexPageTableFailureMessage;
};
const renderPending = (resourceName) => {
  const IndexPageTableFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Loading {resourceName} data from the server...
    </p>
  );

  return IndexPageTableFailureMessage;
};

const IndexPageTable = (props) => {
  const {
    Table,
    columns,
    endpoint,
    mapData,
    resourceName,
  } = props;
  const pluralResourceName = underscore(pluralize(resourceName));
  const { hooks } = endpoint;
  const { useData, useFindStatus, useFindRequest, useStore } = hooks;

  console.log('state:', useStore().getState());
  const data = useData();
  const status = useFindStatus();
  console.log('status:', status);
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(pluralResourceName),
  );
  const mappedData = actualMapData(data);
  const request = useFindRequest();
  const { performRequest } = request;
  const onDelete = ({ dispatch, getState }) => {
    performRequest()(dispatch, getState);
  };
  const ActualTable = valueOrDefault(Table, BasicTable);

  const AppliedIndexPageTable = () => (
    <ActualTable
      columns={columns}
      data={mappedData}
      message={emptyMessage(pluralResourceName)}
      resourceName={pluralResourceName}
      cellProps={{ onDelete }}
    />
  );

  return (
    <StatusSwitch
      renderFailure={renderFailure(pluralResourceName)}
      renderInitialized={renderPending(pluralResourceName)}
      renderPending={renderPending(pluralResourceName)}
      renderSuccess={AppliedIndexPageTable}
      status={status}
    />
  );
};

IndexPageTable.defaultProps = {
  Table: null,
  mapData: null,
};

IndexPageTable.propTypes = {
  Table: PropTypes.elementType,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func,
    }).isRequired,
    request: PropTypes.shape({
      performRequest: PropTypes.func.isRequired,
    }),
  }).isRequired,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default IndexPageTable;
