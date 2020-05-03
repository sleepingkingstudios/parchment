import {
  decode as decodeBase64,
  encode as encodeBase64,
} from 'base-64';

import { exists } from '../../utils/object';

export const decode = (encoded) => {
  if (!exists(encoded)) { return {}; }

  try {
    return JSON.parse(decodeBase64(encoded));
  } catch (error) {
    return {};
  }
};

export const encode = (session) => {
  if (!exists(session)) { return encode({}); }

  return encodeBase64(JSON.stringify(session));
};
