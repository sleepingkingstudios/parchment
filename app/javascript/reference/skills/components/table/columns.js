import ResponsiveActions from 'components/responsive-actions';
import { injectProps } from 'utils/react';
import { capitalize } from 'utils/string';

import './skills-table-styles.css';

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Name',
    prop: 'name',
    width: 6,
  },
  {
    label: 'Ability Score',
    prop: 'abilityScore',
    value: skill => capitalize(skill.abilityScore),
    width: 3,
  },
  {
    label: false,
    prop: 'actions',
    value: injectProps(
      ResponsiveActions,
      {
        actions,
        baseUrl,
        resourceName: 'skill',
        useDestroyRequest,
      },
    ),
    width: 3,
  },
  {
    header: false,
    label: 'Description',
    prop: 'shortDescription',
    width: 12,
  },
]);

export default generateColumns;
