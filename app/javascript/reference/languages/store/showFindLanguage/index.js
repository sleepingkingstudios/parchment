import showEndpoint from '../../../../api/resources/show';
import collectAssociations from '../../../../api/middleware/collectAssociations';
import { buildLanguage } from '../../entities';

const collectDialects = collectAssociations({
  associationName: 'dialects',
  associationType: 'hasMany',
  inverseName: 'parent_language',
  polymorphic: false,
  resourceName: 'language',
});
const collectParentLanguage = collectAssociations({
  associationName: 'parent_language',
  associationType: 'belongsTo',
  inverseName: 'dialects',
  polymorphic: false,
  resourceName: 'language',
});
const endpoint = showEndpoint({
  data: { language: buildLanguage() },
  middleware: [
    {
      after: 'api/authorization',
      middleware: collectDialects,
    },
    {
      after: 'api/authorization',
      middleware: collectParentLanguage,
    },
  ],
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
