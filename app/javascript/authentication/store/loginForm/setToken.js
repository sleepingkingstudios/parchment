import { setToken } from '../session/actions';
import { dig } from '../../../utils/object';

const handleSuccess = next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const token = dig(response, 'json', 'data', 'token');

  dispatch(setToken(token));
};

export default { handleSuccess };
