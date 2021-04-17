import ResponsiveActions from 'components/responsive-actions';
import { injectProps } from 'utils/react';
import { truncate } from 'utils/string';
import ResponsiveSchool from './responsive-school';

const spellDescription = (spell) => {
  if (spell.shortDescription) {
    return truncate(spell.shortDescription, 80);
  }

  return truncate(spell.description, 80);
};

const generateColumns = ({ actions, baseUrl, useDestroyRequest }) => ([
  {
    label: 'Name',
    prop: 'name',
    width: 6,
  },
  {
    label: 'School',
    prop: 'school',
    width: 3,
    value: ResponsiveSchool,
  },
  {
    label: false,
    prop: 'actions',
    width: 3,
    value: injectProps(
      ResponsiveActions,
      {
        actions,
        baseUrl,
        resourceName: 'spell',
        useDestroyRequest,
      },
    ),
  },
  {
    header: false,
    label: false,
    prop: 'description',
    width: 12,
    value: spellDescription,
  },
]);

export default generateColumns;
