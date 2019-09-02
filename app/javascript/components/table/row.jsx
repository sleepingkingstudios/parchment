import React from 'react';
import PropTypes from 'prop-types';

const cellValue = (column, item) => {
  if (typeof column.value === 'function') { return column.value(item); }

  const value = item[column.prop];

  if (value === true || value === false) { return value.toString(); }

  return value;
};

const buildTableCells = (columns, item) => (
  columns.map(column => (
    <td key={`${item.id}-${column.prop}`}>
      { cellValue(column, item) }
    </td>
  ))
);

const TableRow = ({ columns, item }) => (
  <tr>
    { buildTableCells(columns, item) }
  </tr>
);

TableRow.defaultProps = {};

TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
};

export default TableRow;
