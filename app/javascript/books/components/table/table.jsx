import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../../components/table';
import columns from './columns';
import { bookListType } from '../../entities';

const emptyMessage = 'There are no books matching the criteria.';

const BooksTable = ({ books, onDelete }) => (
  <Table columns={columns} data={books} message={emptyMessage} cellProps={{ onDelete }} />
);

BooksTable.defaultProps = {
  onDelete: () => {},
};

BooksTable.propTypes = {
  onDelete: PropTypes.func,
  books: bookListType.isRequired,
};

export default BooksTable;
