import collectAssociations from 'api/middleware/collectAssociations';
import buildResource from 'resource';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildSpell } from './entities';

const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});

const resourceName = 'spells';
const url = '/api/spells';
const resources = {
  create: { options: { data: { spell: buildSpell() } } },
  index: true,
  show: { options: { middleware: [collectSource] } },
  update: true,
};
const resource = buildResource({
  Block,
  Form,
  Table,
  resources,
  resourceName,
  url,
});

export default resource;

const {
  Routes,
  reducer,
} = resource;

export {
  Routes,
  reducer,
};
