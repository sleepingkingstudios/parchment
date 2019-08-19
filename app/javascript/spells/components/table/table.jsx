import React from 'react';

import Table from '../../../components/table';
import columns from './columns';
import { spellListType } from '../../entities';

const emptyMessage = 'There are no spells matching the criteria.';

const SpellsTable = ({ spells }) => (
  <Table columns={columns} data={spells} message={emptyMessage} />
);

SpellsTable.defaultProps = {};

SpellsTable.propTypes = {
  spells: spellListType.isRequired,
};

export default SpellsTable;
