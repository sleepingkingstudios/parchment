import SkillsTableActions from './actions';
import { capitalize } from '../../../../utils/string';

import './skills-table-styles.css';

const columns = [
  {
    label: 'Name',
    prop: 'name',
    width: 6,
  },
  {
    label: 'Ability Score',
    prop: 'abilityScore',
    value: skill => capitalize(skill.abilityScore),
    width: 3,
  },
  {
    label: false,
    prop: 'actions',
    value: SkillsTableActions,
    width: 3,
  },
  {
    header: false,
    label: 'Description',
    prop: 'shortDescription',
    width: 12,
  },
];

export default columns;
