import React from 'react';

import DynamicTable from '../../../components/dynamic-table';
import { IndexPage } from '../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindBooks';

const IndexBooksPage = () => (
  <IndexPage Table={DynamicTable} columns={columns} endpoint={endpoint} resourceName="Book" />
);

IndexBooksPage.defaultProps = {};

IndexBooksPage.propTypes = {};

export default IndexBooksPage;
