import showEndpoint from '../../../../api/resources/show';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

const endpoint = showEndpoint({
  data: { condition: buildCondition() },
  namespace: 'mechanics/conditions/showFindCondition',
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
