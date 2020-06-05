import React from 'react';

import DynamicTable from '../../../../components/dynamic-table';
import { IndexPage } from '../../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindConditions';

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
    label: 'Conditions',
    url: 'mechanics/conditions',
    active: true,
  },
];
const buttons = [
  {
    label: 'Create Condition',
    outline: true,
    url: '/mechanics/conditions/create',
  },
];

const IndexConditionsPage = () => (
  <IndexPage
    Table={DynamicTable}
    breadcrumbs={breadcrumbs}
    buttons={buttons}
    columns={columns}
    endpoint={endpoint}
    resourceName="Condition"
  />
);

IndexConditionsPage.defaultProps = {};

IndexConditionsPage.propTypes = {};

export default IndexConditionsPage;
