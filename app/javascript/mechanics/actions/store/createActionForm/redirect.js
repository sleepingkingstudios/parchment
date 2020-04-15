import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const { json } = response;
    const { data } = json;
    const { action } = data;

    const actionUrl = `/mechanics/actions/${action.id}`;

    dispatch(push(actionUrl));
  },
};
