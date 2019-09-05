import DeleteOneEndpoint from '../../../api/deleteOne';
import alerts from './alerts';
import redirect from './redirect';

const REQUEST_URL = '/api/spells/:id';
const endpoint = new DeleteOneEndpoint({
  data: {},
  middleware: [
    alerts,
    redirect,
  ],
  namespace: 'spells/deleteSpell',
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