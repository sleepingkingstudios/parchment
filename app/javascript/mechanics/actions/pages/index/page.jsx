import React from 'react';

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

const IndexActionsPage = () => (
  <IndexPage
    breadcrumbs={breadcrumbs}
    columns={columns}
    endpoint={endpoint}
    resourceName="Action"
  />
);

IndexActionsPage.defaultProps = {};

IndexActionsPage.propTypes = {};

export default IndexActionsPage;
