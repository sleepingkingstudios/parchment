import React from 'react';

import columns from './columns';

const tableHeadingItems = () => (
  columns.map(column => (
    <th key={column.prop}>
      { column.label }
    </th>
  ))
);

const TableHeader = () => (
  <thead>
    <tr>
      { tableHeadingItems() }
    </tr>
  </thead>
);

export default TableHeader;
