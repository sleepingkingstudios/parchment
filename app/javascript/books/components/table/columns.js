import BooksTableActions from './actions';

const columns = [
  {
    label: 'Title',
    prop: 'title',
    width: 5,
  },
  {
    label: 'Publisher',
    prop: 'publisherName',
    width: 4,
  },
  {
    label: ' ',
    prop: 'actions',
    value: BooksTableActions,
    width: 3,
  },
];

export default columns;
