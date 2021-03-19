import buildResource from 'resource';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildItem } from './entities';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Reference',
    url: '/reference',
    active: true,
  },
];
const namespace = 'reference/items';
const resourceName = 'items';
const url = '/api/reference/items';
const resources = {
  create: { options: { data: { item: buildItem() } } },
  index: true,
  show: true,
  update: true,
};

const resource = buildResource({
  Block,
  Form,
  Table,
  breadcrumbs,
  namespace,
  resources,
  resourceName,
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
