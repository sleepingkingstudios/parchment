import buildResource from 'resource';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { Content as ItemsIndexPageContent } from './pages/index-page';
import { buildItem } from './entities';
import {
  Routes as MagicItems,
  reducer as magicItemsReducer,
} from './magic-items';

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
  magicItems: {
    component: MagicItems,
    exact: false,
    options: {},
    path: '/magic-items',
    reducer: magicItemsReducer,
  },
  create: { options: { data: { item: buildItem() } } },
  index: { options: { Content: ItemsIndexPageContent } },
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
