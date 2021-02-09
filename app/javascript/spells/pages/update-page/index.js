import buildUpdatePage from 'resource/pages/update-page';
import { Form } from '../../components/form';
import { buildSpell } from '../../entities';

const data = { spell: buildSpell() };
const namespace = 'spells/update';
const resourceName = 'spell';
const url = '/api/spells';

const updatePage = buildUpdatePage({
  Form,
  data,
  namespace,
  resourceName,
  url,
});
const {
  Page,
  reducer,
} = updatePage;

export default updatePage;

export {
  Page,
  reducer,
};
