import SpellsTableActions from './actions';

import {
  capitalize,
  truncate,
} from '../../../utils/string';

const spellDescription = (spell) => {
  if (spell.shortDescription) {
    return truncate(spell.shortDescription, 60);
  }

  return truncate(spell.description, 60);
};

const columns = [
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'School',
    prop: 'school',
    value: spell => capitalize(spell.school),
  },
  {
    label: 'Level',
    prop: 'level',
  },
  {
    label: 'Description',
    prop: 'description',
    value: spellDescription,
  },
  {
    label: ' ',
    prop: 'actions',
    value: SpellsTableActions,
  },
];

export default columns;
