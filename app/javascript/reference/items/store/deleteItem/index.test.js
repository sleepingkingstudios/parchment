import endpoint from './index';

describe('DeleteItem store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      namespace: 'reference/items/deleteItem',
      resourceName: 'item',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/delete');
  });
});
