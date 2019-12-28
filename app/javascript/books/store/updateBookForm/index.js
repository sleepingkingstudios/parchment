import FormEndpoint from '../../../api/form';
import { buildBook } from '../../entities';
import alerts from './alerts';
import redirect from './redirect';

const namespace = 'books/updateBookForm';
const REQUEST_URL = '/api/books/:id';

export const {
  actions,
  hooks,
  reducer,
  request,
} = new FormEndpoint({
  data: { book: buildBook() },
  method: 'PATCH',
  middleware: [
    redirect,
    alerts,
  ],
  namespace,
  url: REQUEST_URL,
});
