import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './header';
import TableMessage from './message';
import TableRow from './row';

const buildBody = (props) => {
  const { columns, data, message } = props;

  if (data.length === 0) {
    return (
      <TableMessage {...{ columns, message }} />
    );
  }

  const { cellProps } = props;

  return data.map(item => (
    <TableRow key={item.id} {...{ columns, item, cellProps }} />
  ));
};

const Table = (props) => {
  const {
    cellProps,
    columns,
    data,
    message,
  } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} />

      <tbody>
        {
          buildBody({
            cellProps,
            columns,
            data,
            message,
          })
        }
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  cellProps: {},
};

Table.propTypes = {
  cellProps: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default Table;
