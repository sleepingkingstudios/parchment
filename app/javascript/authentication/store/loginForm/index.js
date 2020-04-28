import FormEndpoint from '../../../api/form';
import alerts from './alerts';
import setToken from './setToken';

const REQUEST_URL = '/api/authentication/session';
const endpoint = new FormEndpoint({
  data: { username: '', password: '' },
  middleware: [
    setToken,
    alerts,
  ],
  namespace: 'authentication/loginForm',
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
