import endpoint from './index';
import { buildItem } from '../../entities';

describe('CreateItemForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const data = { item: buildItem() };

    expect(options).toEqual({
      data,
      namespace: 'reference/items/createItemForm',
      resourceName: 'item',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/createForm');
  });
});
