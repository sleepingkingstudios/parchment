import deleteEndpoint from '../../../../api/resources/delete';

const endpoint = deleteEndpoint({
  namespace: 'mechanics/conditions/deleteCondition',
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
