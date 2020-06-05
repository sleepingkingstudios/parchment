import updateFormEndpoint from '../../../../api/resources/updateForm';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

const endpoint = updateFormEndpoint({
  data: { mechanic: buildCondition() },
  namespace: 'mechanics/conditions/updateConditionForm',
  resourceName: 'condition',
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
