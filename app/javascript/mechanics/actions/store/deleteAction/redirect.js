import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const actionsUrl = '/mechanics/actions';

    dispatch(push(actionsUrl));
  },
};
