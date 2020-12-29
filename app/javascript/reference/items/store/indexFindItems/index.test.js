import endpoint from './index';

describe('IndexFindItems store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { items: [] },
      namespace: 'reference/items/indexFindItems',
      resourceName: 'items',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
