import buildResource from 'resource';
import { Content as ItemsIndexPageContent } from '../pages/index-page';
import { Block } from './components/block';
import { Table } from './components/table';

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
  {
    label: 'Items',
    url: '/reference/items',
  },
];
const namespace = 'reference/items/magicItems';
const resourceName = 'magicItems';
const url = '/api/reference/items/magic_items';
const resources = {
  create: false,
  index: { options: { Content: ItemsIndexPageContent } },
  show: true,
  update: false,
};

const resource = buildResource({
  Block,
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
