import { clearSession } from '../../../authentication/store/session/actions';
import { dig, exists } from '../../../utils/object';

const authorization = {
  buildRequest: next => ({ getState, method, namespace }) => {
    const state = getState();
    const token = dig(state, 'authentication', 'session', 'token');
    const request = next({ getState, method, namespace });

    if (!exists(token)) { return request; }

    const headers = Object.assign(
      {},
      request.headers,
      { Authorization: `BEARER ${token}` },
    );

    return Object.assign({}, request, { headers });
  },
  handleFailure: next => ({ dispatch, getState, response }) => {
    const { status } = response;

    next({ dispatch, getState, response });

    if (!(status === 401 || status === 403)) { return; }

    dispatch(clearSession());
  },
  type: 'api/authorization',
};

export default authorization;
