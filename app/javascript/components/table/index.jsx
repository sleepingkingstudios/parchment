import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './header';
import TableMessage from './message';
import TableRow from './row';

const buildBody = ({ columns, data, message }) => {
  if (data.length === 0) {
    return (
      <TableMessage {...{ columns, message }} />
    );
  }

  return data.map(item => (
    <TableRow key={item.id} {...{ columns, item }} />
  ));
};

const Table = ({ columns, data, message }) => (
  <table className="table">
    <TableHeader columns={columns} />

    <tbody>
      { buildBody({ columns, data, message }) }
    </tbody>
  </table>
);

Table.defaultProps = {};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default Table;
