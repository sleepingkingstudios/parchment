import React from 'react';
import PropTypes from 'prop-types';

import columns from './columns';
import {
  INITIALIZED,
  FAILURE,
  PENDING,
} from '../../store/request_status';

const numColumns = columns.length;

const message = (status) => {
  switch (status) {
    case INITIALIZED:
    case PENDING:
      return 'Loading spells data from the server...';
    case FAILURE:
    default:
      return 'Unable to load spells data from the server.';
  }
};

const TableMessage = ({ spellsRequestStatus }) => (
  <tr>
    <td colSpan={numColumns}>
      { message(spellsRequestStatus) }
    </td>
  </tr>
);

TableMessage.defaultProps = {};

TableMessage.propTypes = {
  spellsRequestStatus: PropTypes.string.isRequired,
};

export default TableMessage;
