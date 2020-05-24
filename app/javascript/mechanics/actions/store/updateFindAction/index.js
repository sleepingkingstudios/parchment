import updateFindEndpoint from '../../../../api/resources/updateFind';
import { buildMechanic } from '../../../entities';
import formEndpoint from '../updateActionForm';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });
const endpoint = updateFindEndpoint({
  data: { mechanic: buildAction() },
  formEndpoint,
  mapData: data => ({ mechanic: data.action }),
  namespace: 'mechanics/actions/updateFindAction',
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
