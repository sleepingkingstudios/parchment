import showEndpoint from '../../../../api/resources/show';
import { buildMechanic } from '../../../entities';

const endpoint = showEndpoint({
  data: { action: Object.assign(buildMechanic(), { type: 'Action' }) },
  namespace: 'mechanics/actions/showFindAction',
  resourceName: 'action',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
