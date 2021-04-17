import ResponsiveActions from 'components/responsive-actions';
import { injectProps } from 'utils/react';

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Title',
    prop: 'title',
    width: 5,
  },
  {
    label: 'Publisher',
    prop: 'publisherName',
    width: 4,
  },
  {
    label: false,
    prop: 'actions',
    value: injectProps(
      ResponsiveActions,
      {
        actions,
        baseUrl,
        resourceName: 'book',
        useDestroyRequest,
      },
    ),
    width: 3,
  },
]);

export default generateColumns;
