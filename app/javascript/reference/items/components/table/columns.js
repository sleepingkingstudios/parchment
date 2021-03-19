import ResponsiveActions from 'components/responsive-actions';
import { injectProps } from 'utils/react';

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Name',
    prop: 'name',
    width: 6,
  },
  {
    label: 'Cost',
    prop: 'cost',
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
        resourceName: 'item',
        useDestroyRequest,
      },
    ),
    width: 3,
  },
]);

export default generateColumns;
