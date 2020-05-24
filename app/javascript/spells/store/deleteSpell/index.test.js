import endpoint from './index';

describe('DeleteSpell store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      resourceName: 'spell',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/delete');
  });
});
