import FindManyEndpoint from '../../../api/findMany';

const REQUEST_URL = '/api/spells';
const endpoint = new FindManyEndpoint({
  data: { spells: [] },
  namespace: 'spells/indexFindSpells',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
