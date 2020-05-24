import indexEndpoint from '../../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { actions: [] },
  namespace: 'mechanics/actions/indexFindActions',
  resourceName: 'actions',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
