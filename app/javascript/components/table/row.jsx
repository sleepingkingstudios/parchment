import React from 'react';
import PropTypes from 'prop-types';

const cellValue = (column, item, cellProps) => {
  if (typeof column.value === 'function') {
    const props = Object.assign({}, item, cellProps);

    return column.value(props);
  }

  const value = item[column.prop];

  if (value === true || value === false) { return value.toString(); }

  return value;
};

const buildTableCells = (columns, item, cellProps) => (
  columns.map(column => (
    <td key={`${item.id}-${column.prop}`}>
      { cellValue(column, item, cellProps) }
    </td>
  ))
);

const TableRow = ({ cellProps, columns, item }) => (
  <tr>
    { buildTableCells(columns, item, cellProps) }
  </tr>
);

TableRow.defaultProps = {
  cellProps: {},
};

TableRow.propTypes = {
  cellProps: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
};

export default TableRow;
