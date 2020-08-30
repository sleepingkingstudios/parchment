import React from 'react';

import DynamicTable from '../../../../components/dynamic-table';
import { IndexPage } from '../../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindLanguages';

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
    label: 'Languages',
    url: 'reference/languages',
    active: true,
  },
];

const IndexLanguagesPage = () => (
  <IndexPage
    Table={DynamicTable}
    breadcrumbs={breadcrumbs}
    buttons={[]}
    columns={columns}
    endpoint={endpoint}
    resourceName="Language"
  />
);

IndexLanguagesPage.defaultProps = {};

IndexLanguagesPage.propTypes = {};

export default IndexLanguagesPage;
