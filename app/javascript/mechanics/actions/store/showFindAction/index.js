import showEndpoint from '../../../../api/resources/show';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

const endpoint = showEndpoint({
  data: { action: buildAction() },
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
