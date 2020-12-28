import endpoint from './index';
import { buildItem } from '../../entities';

describe('UpdateItemForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { item: buildItem() },
      namespace: 'reference/items/updateItemForm',
      resourceName: 'item',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateForm');
  });
});
