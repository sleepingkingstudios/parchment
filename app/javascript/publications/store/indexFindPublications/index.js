import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/publications';
const endpoint = new FindManyEndpoint({
  data: { publications: [] },
  middleware: [],
  namespace: 'publications/indexFindPublications',
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
