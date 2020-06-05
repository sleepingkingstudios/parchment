import indexEndpoint from '../../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { conditions: [] },
  namespace: 'mechanics/conditions/indexFindConditions',
  resourceName: 'conditions',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
