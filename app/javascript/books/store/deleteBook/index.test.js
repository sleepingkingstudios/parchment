import endpoint from './index';

describe('DeleteBook store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({ resourceName: 'book' });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/delete');
  });
});
