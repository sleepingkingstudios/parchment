import buildResource from 'resource';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildBook } from './entities';

const resourceName = 'books';
const url = '/api/sources/books';
const resources = {
  create: { options: { data: { book: buildBook() } } },
  index: true,
  show: true,
  update: true,
};
const resource = buildResource({
  Block,
  Form,
  Table,
  resources,
  resourceName,
  resourceNameProp: 'title',
  url,
});
const {
  Routes,
  reducer,
} = resource;

export default resource;

export {
  Routes,
  reducer,
};
