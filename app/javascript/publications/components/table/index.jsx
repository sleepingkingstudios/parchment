import React from 'react';

import Table from '../../../components/table';
import columns from './columns';
import { publicationListType } from '../../entities';

const emptyMessage = 'There are no publications matching the criteria.';

const PublicationsTable = ({ publications }) => (
  <Table columns={columns} data={publications} message={emptyMessage} />
);

PublicationsTable.defaultProps = {};

PublicationsTable.propTypes = {
  publications: publicationListType.isRequired,
};

export default PublicationsTable;
