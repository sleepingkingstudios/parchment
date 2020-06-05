import endpoint from './index';

describe('IndexFindConditions store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { conditions: [] },
      namespace: 'mechanics/conditions/indexFindConditions',
      resourceName: 'conditions',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
