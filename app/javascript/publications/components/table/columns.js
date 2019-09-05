import PublicationsTableActions from './actions';

const columns = [
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Publisher',
    prop: 'publisherName',
  },
  {
    label: 'Date',
    prop: 'publicationDate',
  },
  {
    label: 'Playtest',
    prop: 'playtest',
  },
  {
    label: ' ',
    prop: 'actions',
    value: PublicationsTableActions,
  },
];

export default columns;
