import createFormEndpoint from '../../../../api/resources/createForm';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });
const endpoint = createFormEndpoint({
  data: { mechanic: buildCondition() },
  namespace: 'mechanics/conditions/createConditionForm',
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
