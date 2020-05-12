import FindManyEndpoint from '../../../../api/findMany';
import authorization from '../../../../api/middleware/authorization';

const REQUEST_URL = '/api/mechanics/actions';
const endpoint = new FindManyEndpoint({
  data: { actions: [] },
  middleware: [
    authorization,
  ],
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
