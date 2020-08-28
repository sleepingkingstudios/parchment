import React from 'react';

import DynamicTable from '../../../../components/dynamic-table';
import { IndexPage } from '../../../../components/index-page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindSkills';

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
    label: 'Skills',
    url: 'reference/skills',
    active: true,
  },
];

const IndexSkillsPage = () => (
  <IndexPage
    Table={DynamicTable}
    breadcrumbs={breadcrumbs}
    buttons={[]}
    columns={columns}
    endpoint={endpoint}
    resourceName="Skill"
  />
);

IndexSkillsPage.defaultProps = {};

IndexSkillsPage.propTypes = {};

export default IndexSkillsPage;
