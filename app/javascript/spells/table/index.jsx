import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/table';
import columns from './columns';
import { spellListType } from '../entities';
import {
  INITIALIZED,
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

const message = (status) => {
  switch (status) {
    case INITIALIZED:
    case PENDING:
      return 'Loading spells data from the server...';
    case SUCCESS:
      return 'There are no spells matching the criteria.';
    case FAILURE:
    default:
      return 'Unable to load spells data from the server.';
  }
};

const SpellsTable = ({ spells, spellsRequestStatus }) => (
  <Table columns={columns} data={spells} message={message(spellsRequestStatus)} />
);

SpellsTable.defaultProps = {};

SpellsTable.propTypes = {
  spells: spellListType.isRequired,
  spellsRequestStatus: PropTypes.string.isRequired,
};

export default SpellsTable;
