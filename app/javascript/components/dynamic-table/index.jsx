import React from 'react';
import PropTypes from 'prop-types';

import { exists } from 'utils/object';
import { addClassName } from 'utils/react';
import { kebabize } from 'utils/string';
import DynamicTableEmptyMessage from './empty-message';
import DynamicTableHeader from './header';
import DynamicTableRow from './row';
import { columnsType } from './entities';

import './dynamic-table-styles.css';

const renderEmptyMessage = (props) => {
  const { data, message } = props;

  if (data.length !== 0) { return null; }

  return (
    <DynamicTableEmptyMessage message={message} />
  );
};

const DynamicTable = (props) => {
  const {
    cellProps,
    className,
    columns,
    data,
    message,
    resourceName,
  } = props;
  const actualClassName = addClassName(
    'dynamic-table',
    exists(resourceName) ? `${kebabize(resourceName)}-table` : null,
    'container',
    className,
  );

  return (
    <div className={actualClassName}>
      <DynamicTableHeader columns={columns} resourceName={resourceName} />

      { renderEmptyMessage({ data, message }) }

      {
        data.map(
          item => (
            <DynamicTableRow
              key={item.id}
              data={item}
              columns={columns}
              cellProps={cellProps}
              resourceName={resourceName}
            />
          ),
        )
      }
    </div>
  );
};

DynamicTable.defaultProps = {
  cellProps: {},
  className: null,
  resourceName: null,
};

DynamicTable.propTypes = {
  cellProps: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
  className: PropTypes.string,
  columns: columnsType.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  message: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  resourceName: PropTypes.string,
};

export default DynamicTable;
