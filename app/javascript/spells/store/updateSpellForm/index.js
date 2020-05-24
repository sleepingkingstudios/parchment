import updateFormEndpoint from '../../../api/resources/updateForm';
import { buildSpell } from '../../entities';

const endpoint = updateFormEndpoint({
  data: { spell: buildSpell() },
  resourceName: 'spell',
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
