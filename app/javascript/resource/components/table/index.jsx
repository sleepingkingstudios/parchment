import React from 'react';
import PropTypes from 'prop-types';

import DynamicTable from 'components/dynamic-table';
import { valueOrDefault } from 'utils/object';

const defaultEmptyMessage = resourceName => (
  `There are no ${resourceName} matching the criteria.`
);

const IndexPageTable = (props) => {
  const {
    columns,
    data,
    resourceName,
    useDestroyRequest,
  } = props;
  const emptyMessage = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.emptyMessage,
    defaultEmptyMessage(resourceName),
  );
  const mapData = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.mapData,
    raw => raw[resourceName],
  );

  return (
    <DynamicTable
      columns={columns({ useDestroyRequest })}
      data={valueOrDefault(mapData(data), [])}
      message={emptyMessage}
      resourceName={resourceName}
    />
  );
};

IndexPageTable.defaultProps = {
  data: {},
  emptyMessage: null,
  mapData: null,
  useDestroyRequest: null,
};

IndexPageTable.propTypes = {
  columns: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  emptyMessage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
  useDestroyRequest: PropTypes.func,
};

export default IndexPageTable;
