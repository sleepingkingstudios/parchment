import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/origins';
const endpoint = new FindManyEndpoint({
  data: { books: [] },
  namespace: 'spells/formFindOrigins',
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
