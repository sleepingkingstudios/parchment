import { capitalize } from '../../utils/string';

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
];

export default columns;
