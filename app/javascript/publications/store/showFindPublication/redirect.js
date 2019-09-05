import { push } from 'connected-react-router';

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    dispatch(push('/publications'));
  },
};
