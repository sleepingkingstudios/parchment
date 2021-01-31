import {
  generateHooks,
  generateReducer,
} from 'api/data';

import { actions } from './find';

const initialState = { spells: [] };
const namespace = 'spells/index/data';

export const hooks = generateHooks({
  namespace,
});

export const reducer = generateReducer({
  actions,
  initialState,
});
