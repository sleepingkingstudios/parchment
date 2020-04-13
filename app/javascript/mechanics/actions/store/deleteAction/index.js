import DeleteOneEndpoint from '../../../../api/deleteOne';
import alerts from './alerts';
import redirect from './redirect';

const REQUEST_URL = '/api/mechanics/actions/:id';
const endpoint = new DeleteOneEndpoint({
  data: {},
  middleware: [
    alerts,
    redirect,
  ],
  namespace: 'mechanics/actions/deleteAction',
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
