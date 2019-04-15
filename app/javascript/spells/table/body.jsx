import React from 'react';
import PropTypes from 'prop-types';

import spellType from '../spell';
import TableMessage from './message';
import TableRow from './row';
import { SUCCESS } from '../../store/requestStatus';

const tableRows = spells => (
  spells.map(spell => (
    <TableRow key={spell.id} spell={spell} />
  ))
);

const tableContents = ({ spells, spellsRequestStatus }) => {
  if (spellsRequestStatus === SUCCESS) {
    return tableRows(spells);
  }

  return (
    <TableMessage {...{ spellsRequestStatus }} />
  );
};

const TableBody = ({ spells, spellsRequestStatus }) => (
  <tbody>
    { tableContents({ spells, spellsRequestStatus }) }
  </tbody>
);

TableBody.defaultProps = {};

TableBody.propTypes = {
  spells: PropTypes.arrayOf(spellType).isRequired,
  spellsRequestStatus: PropTypes.string.isRequired,
};

export default TableBody;
