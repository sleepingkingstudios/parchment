import { setSession } from '../session/actions';
import { dig } from '../../../utils/object';

const handleSuccess = next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const session = dig(response, 'json', 'data');
  const { token, user } = session;

  dispatch(setSession({ token, user }));
};

export default { handleSuccess };
