import FindManyEndpoint from '../../../api/findMany';
import authorization from '../../../api/middleware/authorization';

const REQUEST_URL = '/api/books';
const endpoint = new FindManyEndpoint({
  data: { books: [] },
  middleware: [
    authorization,
  ],
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
