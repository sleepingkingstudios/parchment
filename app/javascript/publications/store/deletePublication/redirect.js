import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const publicationsUrl = '/publications';

    dispatch(push(publicationsUrl));
  },
};
