import FormEndpoint from '../../../api/form';
import authorization from '../../../api/middleware/authorization';
import { buildBook } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const REQUEST_URL = '/api/books';
const endpoint = new FormEndpoint({
  data: { book: buildBook() },
  middleware: [
    authorization,
    redirect,
    alerts,
  ],
  namespace: 'books/createBookForm',
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
