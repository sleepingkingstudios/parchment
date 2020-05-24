import deleteEndpoint from '../../../../api/resources/delete';

const endpoint = deleteEndpoint({
  namespace: 'mechanics/actions/deleteAction',
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
