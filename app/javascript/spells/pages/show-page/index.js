import collectAssociations from 'api/middleware/collectAssociations';
import buildShowPage from 'resource/pages/show-page';
import { Block } from '../../components/block';

const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});
const middleware = [collectSource];
const namespace = 'spells/show';
const resourceName = 'spell';
const url = '/api/spells';

const showPage = buildShowPage({
  Block,
  middleware,
  namespace,
  resourceName,
  url,
});
const {
  Page,
  reducer,
} = showPage;

export default showPage;

export {
  Page,
  reducer,
};
