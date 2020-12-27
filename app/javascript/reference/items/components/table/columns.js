import ItemsTableActions from './actions';

const columns = [
  {
    label: 'Name',
    prop: 'name',
    width: 6,
  },
  {
    label: 'Cost',
    prop: 'cost',
    width: 3,
  },
  {
    label: false,
    prop: 'actions',
    value: ItemsTableActions,
    width: 3,
  },
];

export default columns;
