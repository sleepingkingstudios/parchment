import React from 'react';

import DynamicTable from '../../../../components/dynamic-table';
import { IndexPage } from '../../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindActions';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Mechanics',
    url: 'mechanics/',
    active: true,
  },
  {
    label: 'Actions',
    url: 'mechanics/actions',
    active: true,
  },
];
const buttons = [
  {
    label: 'Create Action',
    outline: true,
    url: '/mechanics/actions/create',
  },
];

const IndexActionsPage = () => (
  <IndexPage
    Table={DynamicTable}
    breadcrumbs={breadcrumbs}
    buttons={buttons}
    columns={columns}
    endpoint={endpoint}
    resourceName="Action"
  />
);

IndexActionsPage.defaultProps = {};

IndexActionsPage.propTypes = {};

export default IndexActionsPage;
