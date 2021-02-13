import buildResource from 'resource';
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
];
const namespace = 'reference/skills';
const resourceName = 'skills';
const url = '/api/reference/skills';
const resources = {
  index: true,
  show: true,
};
const resource = buildResource({
  Block,
  Table,
  breadcrumbs,
  destroy: false,
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
