import endpoint from './index';

describe('IndexFindActions store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { actions: [] },
      namespace: 'mechanics/actions/indexFindActions',
      resourceName: 'actions',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
