import endpoint from './index';
import { buildLanguage } from '../../entities';

describe('ShowFindLanguage store', () => {
  const { options, type } = endpoint;

  it('should return the collectDialects middleware', () => {
    const { after, middleware } = options.middleware[0];

    expect(after).toEqual('api/authorization');
    expect(middleware.type).toEqual('api/collectAssociations');
    expect(middleware.options).toEqual({
      associationName: 'dialects',
      associationType: 'hasMany',
      inverseName: 'parent_language',
      polymorphic: false,
      resourceName: 'language',
    });
  });

  it('should return the collectParentLanguage middleware', () => {
    const { after, middleware } = options.middleware[1];

    expect(after).toEqual('api/authorization');
    expect(middleware.type).toEqual('api/collectAssociations');
    expect(middleware.options).toEqual({
      associationName: 'parent_language',
      associationType: 'belongsTo',
      inverseName: 'dialects',
      polymorphic: false,
      resourceName: 'language',
    });
  });

  it('should return the options', () => {
    expect(options).toEqual({
      data: { language: buildLanguage() },
      middleware: expect.any(Array),
      namespace: 'reference/languages/showFindLanguage',
      resourceName: 'language',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
