import ConditionsTableActions from './actions';

const columns = [
  {
    label: 'Name',
    prop: 'name',
    width: 3,
  },
  {
    label: 'Description',
    prop: 'shortDescription',
    width: 6,
  },
  {
    label: false,
    prop: 'actions',
    value: ConditionsTableActions,
    width: 3,
  },
];

export default columns;
