import updateFormEndpoint from '../../../../api/resources/updateForm';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

const endpoint = updateFormEndpoint({
  data: { mechanic: buildAction() },
  namespace: 'mechanics/actions/updateActionForm',
  resourceName: 'action',
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
