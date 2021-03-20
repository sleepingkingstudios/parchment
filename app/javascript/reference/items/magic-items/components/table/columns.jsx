import ResponsiveActions from 'components/responsive-actions';
import { injectProps } from 'utils/react';
import { titleize } from 'utils/string';

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Name',
    prop: 'name',
    width: 4,
  },
  {
    label: 'Category',
    prop: 'category',
    width: 3,
    value: magicItem => titleize(magicItem.category),
  },
  {
    label: 'Rarity',
    prop: 'rarity',
    width: 2,
    value: magicItem => titleize(magicItem.rarity),
  },
  {
    label: false,
    prop: 'actions',
    value: injectProps(
      ResponsiveActions,
      {
        actions,
        baseUrl,
        resourceName: 'magicItem',
        useDestroyRequest,
      },
    ),
    width: 3,
  },
]);

export default generateColumns;
