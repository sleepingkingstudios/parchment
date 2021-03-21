import React from 'react';
import PropTypes from 'prop-types';

import { exists } from 'utils/object';
import { addClassName } from 'utils/react';
import { kebabize } from 'utils/string';
import DynamicTableHeaderCell from './cell';
import { columnsType } from '../entities';

const DynamicTableHeader = (props) => {
  const { columns, resourceName } = props;
  const className = addClassName(
    'dynamic-table-header',
    exists(resourceName) ? `${kebabize(resourceName)}-table-header` : null,
    'row',
  );

  return (
    <div className={className}>
      {
        columns.map(
          columnProps => (
            <DynamicTableHeaderCell
              {...columnProps}
              key={columnProps.prop}
              resourceName={resourceName}
            />
          ),
        )
      }
    </div>
  );
};

DynamicTableHeader.defaultProps = {
  resourceName: null,
};

DynamicTableHeader.propTypes = {
  columns: columnsType.isRequired,
  resourceName: PropTypes.string,
};

export default DynamicTableHeader;
