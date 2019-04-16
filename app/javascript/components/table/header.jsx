import React from 'react';
import PropTypes from 'prop-types';

const tableHeadingItems = columns => (
  columns.map(column => (
    <th key={column.prop}>
      { column.label }
    </th>
  ))
);

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      { tableHeadingItems(columns) }
    </tr>
  </thead>
);

TableHeader.defaultProps = {};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHeader;
