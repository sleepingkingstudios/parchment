import endpoint from './index';

describe('DeleteCondition store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      namespace: 'mechanics/conditions/deleteCondition',
      resourceName: 'condition',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/delete');
  });
});
