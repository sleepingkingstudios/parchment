export const CLEAR_TOKEN = 'authentication/session/clearToken';
export const SET_TOKEN = 'authentication/session/setToken';

export const clearToken = () => ({
  type: CLEAR_TOKEN,
  payload: {},
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: { token },
});

const actions = {
  CLEAR_TOKEN,
  SET_TOKEN,
  clearToken,
  setToken,
};

export default actions;
