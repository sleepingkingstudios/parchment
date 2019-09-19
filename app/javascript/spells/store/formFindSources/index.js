import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/spells/sources';
const endpoint = new FindManyEndpoint({
  data: { publications: [] },
  middleware: [],
  namespace: 'spells/formFindSources',
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
