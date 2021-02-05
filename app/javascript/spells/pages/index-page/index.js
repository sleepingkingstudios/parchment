import buildIndexPage from 'resource/pages/index-page';
import { Table } from '../../components/table';

const namespace = 'spells/index';
const resourceName = 'spells';
const url = '/api/spells';

const indexPage = buildIndexPage({
  Table,
  namespace,
  resourceName,
  url,
});
const {
  Page,
  reducer,
} = indexPage;

export default indexPage;

export {
  Page,
  reducer,
};
