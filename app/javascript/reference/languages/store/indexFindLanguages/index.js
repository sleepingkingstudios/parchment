import indexEndpoint from '../../../../api/resources/index';

const endpoint = indexEndpoint({
  data: { languages: [] },
  namespace: 'reference/languages/indexFindLanguages',
  resourceName: 'languages',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
