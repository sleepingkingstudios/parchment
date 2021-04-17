import React from 'react';
import ResponsiveActions from 'components/responsive-actions';
import { exists } from 'utils/object';
import { injectProps } from 'utils/react';

import { formatType } from '../../utils';

const itemType = (item) => {
  const { type } = item;

  if (exists(type)) { return formatType(type); }

  return (
    <span className="text-muted">(None)</span>
  );
};

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Name',
    prop: 'name',
    width: 4,
  },
  {
    label: 'Type',
    prop: 'type',
    width: 3,
    value: itemType,
  },
  {
    label: 'Cost',
    prop: 'cost',
    width: 2,
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
