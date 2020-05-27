import React from 'react';
import PropTypes from 'prop-types';

import DynamicTableRowCell from './cell';
import { columnsType } from '../entities';
import { exists } from '../../../utils/object';
import { addClassName } from '../../../utils/react';

const DynamicTableRow = (props) => {
  const {
    cellProps,
    columns,
    data,
    resourceName,
  } = props;
  const className = addClassName(
    'dynamic-table-row',
    exists(resourceName) ? `${resourceName}-table-row` : null,
    'row',
  );

  return (
    <div className={className}>
      {
        columns.map(
          columnProps => (
            <DynamicTableRowCell
              {...columnProps}
              cellProps={cellProps}
              data={data}
              resourceName={resourceName}
              key={columnProps.prop}
            />
          ),
        )
      }
    </div>
  );
};

DynamicTableRow.defaultProps = {
  cellProps: {},
  resourceName: null,
};

DynamicTableRow.propTypes = {
  cellProps: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
  columns: columnsType.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  resourceName: PropTypes.string,
};

export default DynamicTableRow;
