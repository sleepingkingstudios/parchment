import indexEndpoint from '../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { books: [] },
  resourceName: 'books',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
