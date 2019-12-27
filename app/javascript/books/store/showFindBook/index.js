import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import { buildBook } from '../../entities';
import redirect from './redirect';

const REQUEST_URL = '/api/books/:id';
const endpoint = new FindOneEndpoint({
  data: { book: buildBook() },
  middleware: [
    redirect,
    alerts,
  ],
  namespace: 'books/showFindBook',
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
