import endpoint from './index';
import { buildBook } from '../../entities';

describe('UpdateBookForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { book: buildBook() },
      resourceName: 'book',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateForm');
  });
});
