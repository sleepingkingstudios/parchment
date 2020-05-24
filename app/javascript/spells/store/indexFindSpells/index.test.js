import endpoint from './index';

describe('IndexFindSpells store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const { data, resourceName } = options;

    expect(data).toEqual({ spells: [] });
    expect(resourceName).toEqual('spells');
  });

  it('should set the middleware', () => {
    expect(options.middleware.length).toEqual(1);

    const directive = options.middleware[0];
    const { after, middleware } = directive;

    expect(after).toEqual('api/authorization');
    expect(middleware.type).toEqual('api/collectAssociations');
    expect(middleware.options).toEqual({
      associationName: 'source',
      associationType: 'hasOne',
      inverseName: 'reference',
      polymorphic: true,
      resourceName: 'spells',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
