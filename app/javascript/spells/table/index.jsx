import React from 'react';
import PropTypes from 'prop-types';

import spellType from '../spell';
import TableBody from './body';
import TableHeader from './header';

const SpellsTable = (props) => {
  const { spells, spellsRequestStatus } = props;

  return (
    <table>
      <TableHeader />

      <TableBody {...{ spells, spellsRequestStatus }} />
    </table>
  );
};

SpellsTable.defaultProps = {};

SpellsTable.propTypes = {
  spells: PropTypes.arrayOf(spellType).isRequired,
  spellsRequestStatus: PropTypes.string.isRequired,
};

export default SpellsTable;
