import React from 'react';
import PropTypes from 'prop-types';

const TableMessage = ({ columns, message }) => (
  <tr>
    <td colSpan={columns.length}>
      { message }
    </td>
  </tr>
);

TableMessage.defaultProps = {};

TableMessage.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default TableMessage;
