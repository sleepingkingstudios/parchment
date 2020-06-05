import updateFindEndpoint from '../../../../api/resources/updateFind';
import { buildMechanic } from '../../../entities';
import formEndpoint from '../updateConditionForm';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });
const endpoint = updateFindEndpoint({
  data: { mechanic: buildCondition() },
  formEndpoint,
  mapData: data => ({ mechanic: data.condition }),
  namespace: 'mechanics/conditions/updateFindCondition',
  resourceName: 'condition',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
