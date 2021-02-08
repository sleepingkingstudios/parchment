import buildCreatePage from 'resource/pages/create-page';
import { Form } from '../../components/form';
import { buildSpell } from '../../entities';

const data = { spell: buildSpell() };
const namespace = 'spells/create';
const resourceName = 'spell';
const url = '/api/spells';

const createPage = buildCreatePage({
  Form,
  data,
  namespace,
  resourceName,
  url,
});
const {
  Page,
  reducer,
} = createPage;

export default createPage;

export {
  Page,
  reducer,
};
