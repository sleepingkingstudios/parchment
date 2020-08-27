import showEndpoint from '../../../../api/resources/show';
import { buildSkill } from '../../entities';

const endpoint = showEndpoint({
  data: { skill: buildSkill() },
  namespace: 'reference/skills/showFindSkill',
  resourceName: 'skill',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
