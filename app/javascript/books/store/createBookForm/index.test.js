import endpoint from './index';
import { buildBook } from '../../entities';

describe('CreateBookForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const data = { book: buildBook() };

    expect(options).toEqual({
      data,
      resourceName: 'book',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/createForm');
  });
});
