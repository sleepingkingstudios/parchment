export const CLEAR_SESSION = 'authentication/session/clearSession';
export const SET_SESSION = 'authentication/session/setSession';

export const clearSession = () => ({
  type: CLEAR_SESSION,
  payload: {},
});

export const setSession = ({ token, user }) => ({
  type: SET_SESSION,
  payload: { token, user },
});

const actions = {
  CLEAR_SESSION,
  SET_SESSION,
  clearSession,
  setSession,
};

export default actions;
