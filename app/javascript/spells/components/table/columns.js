import ResponsiveSchool from './responsive-school';
import SpellsTableActions from './actions';

import { truncate } from '../../../utils/string';

import './spells-table-styles.css';

const spellDescription = (spell) => {
  if (spell.shortDescription) {
    return truncate(spell.shortDescription, 80);
  }

  return truncate(spell.description, 80);
};

const spellColumns = [
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
    value: SpellsTableActions,
  },
  {
    header: false,
    label: false,
    prop: 'description',
    width: 12,
    value: spellDescription,
  },
];

export default spellColumns;
