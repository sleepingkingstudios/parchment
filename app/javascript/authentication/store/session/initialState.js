// TODO: Make this a function ({ localStorage }) => {};

import { decode } from '../encoder';
import { buildUser } from '../../entities';
import { valueOrDefault } from '../../../utils/object';

const defaultState = { token: '', user: buildUser() };
const sessionKey = 'authentication/session';

export default ({ localStorage }) => {
  const encoded = valueOrDefault(localStorage.getItem(sessionKey), '');
  const session = decode(encoded);

  return Object.assign({}, defaultState, session);
};
