import React from 'react';

import columns from './columns';
import spellType from '../spell';

const tableCells = spell => (
  columns.map(column => (
    <td key={`${spell.id}-${column.prop}`}>
      { spell[column.prop] }
    </td>
  ))
);

const TableRow = ({ spell }) => (
  <tr>
    { tableCells(spell) }
  </tr>
);

TableRow.defaultProps = {};

TableRow.propTypes = {
  spell: spellType.isRequired,
};

export default TableRow;
