import indexEndpoint from '../../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { skills: [] },
  namespace: 'reference/skills/indexFindSkills',
  resourceName: 'skills',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
