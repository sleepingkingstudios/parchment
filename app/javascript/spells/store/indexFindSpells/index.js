import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/spells';
const findSpells = new FindManyEndpoint({
  data: { spells: [] },
  middleware: [],
  namespace: 'spells/indexFindSpells',
  url: REQUEST_URL,
});

export default findSpells;

export const {
  actions,
  namespace,
  reducer,
  request,
} = findSpells;

export { default as useSpells } from './useSpells';
