import showEndpoint from '../../../../api/resources/show';
import { buildLanguage } from '../../entities';

const endpoint = showEndpoint({
  data: { language: buildLanguage() },
  namespace: 'reference/languages/showFindLanguage',
  resourceName: 'language',
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
