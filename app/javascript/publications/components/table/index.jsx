import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../../components/table';
import columns from './columns';
import { publicationListType } from '../../entities';

const emptyMessage = 'There are no publications matching the criteria.';

const PublicationsTable = ({ publications, onDelete }) => (
  <Table columns={columns} data={publications} message={emptyMessage} cellProps={{ onDelete }} />
);

PublicationsTable.defaultProps = {
  onDelete: () => {},
};

PublicationsTable.propTypes = {
  onDelete: PropTypes.func,
  publications: publicationListType.isRequired,
};

export default PublicationsTable;
