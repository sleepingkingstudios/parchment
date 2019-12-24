import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/books';
const endpoint = new FindManyEndpoint({
  data: { books: [] },
  namespace: 'books/indexFindBooks',
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
