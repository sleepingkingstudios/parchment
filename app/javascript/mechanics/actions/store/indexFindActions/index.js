import FindManyEndpoint from '../../../../api/findMany';

const REQUEST_URL = '/api/mechanics/actions';
const endpoint = new FindManyEndpoint({
  data: { actions: [] },
  namespace: 'mechanics/actions/indexFindActions',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
