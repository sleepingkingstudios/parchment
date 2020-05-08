import { encode } from './encoder';
import {
  dig,
  exists,
  valueOrDefault,
} from '../../utils/object';

const sessionKey = 'authentication/session';

const tokenObserver = ({ localStorage, store }) => {
  let currentToken = '';

  const handleChange = () => {
    const nextSession = valueOrDefault(
      dig(store.getState(), 'authentication', 'session'),
      {},
    );
    const nextToken = valueOrDefault(dig(nextSession, 'token'), '');

    if (nextToken !== currentToken) {
      currentToken = nextToken;

      if (exists(nextToken) && !(nextToken.length === 0)) {
        const encoded = encode(nextSession);

        localStorage.setItem(sessionKey, encoded);
      } else {
        localStorage.removeItem(sessionKey);
      }
    }
  };

  return store.subscribe(handleChange);
};

export default tokenObserver;
