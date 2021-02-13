import React from 'react';
import PropTypes from 'prop-types';

import DynamicTable from 'components/dynamic-table';
import { valueOrDefault } from 'utils/object';

const defaultEmptyMessage = pluralDisplayName => (
  `There are no ${pluralDisplayName} matching the criteria.`
);

const IndexPageTable = (props) => {
  const {
    baseUrl,
    columns,
    data,
    pluralDisplayName,
    resourceName,
    useDestroyRequest,
  } = props;
  const emptyMessage = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.emptyMessage,
    defaultEmptyMessage(pluralDisplayName),
  );
  const mapData = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.mapData,
    raw => raw[resourceName],
  );

  return (
    <DynamicTable
      columns={columns({ baseUrl, useDestroyRequest })}
      data={valueOrDefault(mapData(data), [])}
      message={emptyMessage}
      resourceName={resourceName}
    />
  );
};

IndexPageTable.defaultProps = {
  baseUrl: null,
  data: {},
  emptyMessage: null,
  mapData: null,
  useDestroyRequest: null,
};

IndexPageTable.propTypes = {
  baseUrl: PropTypes.string,
  columns: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  emptyMessage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  mapData: PropTypes.func,
  pluralDisplayName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  useDestroyRequest: PropTypes.func,
};

export default IndexPageTable;
