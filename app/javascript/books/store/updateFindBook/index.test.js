import endpoint from './index';
import { buildBook } from '../../entities';
import formEndpoint from '../updateBookForm';

describe('UpdateFindBook store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { book: buildBook() },
      formEndpoint,
      resourceName: 'book',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateFind');
  });
});
