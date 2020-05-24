import endpoint from './index';

describe('IndexFindBooks store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { books: [] },
      resourceName: 'books',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
