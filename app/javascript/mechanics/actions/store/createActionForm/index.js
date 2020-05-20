import createFormEndpoint from '../../../../api/createForm';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });
const endpoint = createFormEndpoint({
  data: { mechanic: buildAction() },
  namespace: 'mechanics/actions/createActionForm',
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
