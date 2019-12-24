import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { BooksTable } from '../../components/table';
import { hooks, request } from '../../store/indexFindBooks';

const renderFailure = () => (
  <p className="loading-message loading-message-failure">
    Unable to load books data from the server.
  </p>
);
const renderPending = () => (
  <p className="loading-message loading-message-pending">
    Loading books data from the server...
  </p>
);
const { useEndpoint } = hooks;
const { performRequest } = request;
const onDelete = ({ dispatch, getState }) => {
  performRequest()(dispatch, getState);
};

const IndexBooksTable = () => {
  const { data, status } = useEndpoint();
  const { books } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<BooksTable books={books} onDelete={onDelete} />)}
      status={status}
    />
  );
};

IndexBooksTable.defaultProps = {};

IndexBooksTable.propTypes = {};

export default IndexBooksTable;
