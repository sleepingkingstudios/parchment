import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const { json } = response;
    const { data } = json;
    const { book } = data;

    const bookUrl = `/books/${book.id}`;

    dispatch(push(bookUrl));
  },
};
