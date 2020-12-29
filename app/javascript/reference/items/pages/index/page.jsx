import React from 'react';

import DynamicTable from '../../../../components/dynamic-table';
import { IndexPage } from '../../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindItems';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Reference',
    url: 'reference/',
    active: true,
  },
  {
    label: 'Items',
    url: 'reference/items',
    active: true,
  },
];
const buttons = [
  {
    label: 'Create Item',
    outline: true,
    url: '/reference/items/create',
  },
];

const IndexItemsPage = () => (
  <IndexPage
    Table={DynamicTable}
    breadcrumbs={breadcrumbs}
    buttons={buttons}
    columns={columns}
    endpoint={endpoint}
    resourceName="Item"
  />
);

IndexItemsPage.defaultProps = {};

IndexItemsPage.propTypes = {};

export default IndexItemsPage;
