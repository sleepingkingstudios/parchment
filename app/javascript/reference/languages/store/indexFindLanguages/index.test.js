import endpoint from './index';

describe('IndexFindLanguages store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { languages: [] },
      namespace: 'reference/languages/indexFindLanguages',
      resourceName: 'languages',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
