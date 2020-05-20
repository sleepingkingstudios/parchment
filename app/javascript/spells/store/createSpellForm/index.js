import createFormEndpoint from '../../../api/createForm';
import { buildSpell } from '../../entities';

const endpoint = createFormEndpoint({
  data: { spell: buildSpell() },
  resourceName: 'spell',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
