import React from 'react';

import { IndexPage } from '../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindBooks';

const IndexBooksPage = () => (
  <IndexPage columns={columns} endpoint={endpoint} resourceName="Book" />
);

IndexBooksPage.defaultProps = {};

IndexBooksPage.propTypes = {};

export default IndexBooksPage;
