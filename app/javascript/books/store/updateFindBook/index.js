import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildBook } from '../../entities';
import { actions as formActions } from '../updateBookForm';

const REQUEST_URL = '/api/books/:id';
const endpoint = new FindOneEndpoint({
  data: { book: buildBook() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { books } = getState();
        const { updateFindBook } = books;
        const { data } = updateFindBook;
        const { setFormData } = formActions;

        dispatch(setFormData(data));
      },
    },
    redirect,
    alerts,
  ],
  namespace: 'books/updateFindBook',
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
