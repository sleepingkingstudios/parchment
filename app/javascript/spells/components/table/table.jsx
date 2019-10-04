import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../../components/table';
import columns from './columns';
import { spellListType } from '../../entities';

const emptyMessage = 'There are no spells matching the criteria.';

const SpellsTable = ({ spells, onDelete }) => (
  <Table columns={columns} data={spells} message={emptyMessage} cellProps={{ onDelete }} />
);

SpellsTable.defaultProps = {
  onDelete: () => {},
};

SpellsTable.propTypes = {
  onDelete: PropTypes.func,
  spells: spellListType.isRequired,
};

export default SpellsTable;
