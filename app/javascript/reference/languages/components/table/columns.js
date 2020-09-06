import LanguagesTableActions from './actions';
import { capitalize } from '../../../../utils/string';

const columns = [
  {
    label: 'Name',
    prop: 'name',
    width: 3,
  },
  {
    label: 'Speakers',
    prop: 'speakers',
    width: 6,
  },
  {
    label: 'Rarity',
    prop: 'rarity',
    width: 2,
    value: language => capitalize(language.rarity),
  },
  {
    label: false,
    prop: 'actions',
    value: LanguagesTableActions,
    width: 1,
  },
];

export default columns;
