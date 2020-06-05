import ActionsTableActions from './actions';

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
    value: ActionsTableActions,
    width: 3,
  },
];

export default columns;
