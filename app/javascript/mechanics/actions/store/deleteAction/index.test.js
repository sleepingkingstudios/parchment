import endpoint from './index';

describe('DeleteAction store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      namespace: 'mechanics/actions/deleteAction',
      resourceName: 'action',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/delete');
  });
});
