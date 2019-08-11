import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const { json } = response;
    const { data } = json;
    const { spell } = data;

    const spellUrl = `/spells/${spell.id}`;

    dispatch(push(spellUrl));
  },
};