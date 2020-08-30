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
    width: 4,
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
    width: 3,
  },
];

export default columns;
