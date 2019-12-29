import BooksTableActions from './actions';

const columns = [
  {
    label: 'Title',
    prop: 'title',
  },
  {
    label: 'Publisher',
    prop: 'publisherName',
  },
  {
    label: ' ',
    prop: 'actions',
    value: BooksTableActions,
  },
];

export default columns;
