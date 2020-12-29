import endpoint from './index';
import { buildItem } from '../../entities';
import formEndpoint from '../updateItemForm';

describe('UpdateFindCondition store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options.data).toEqual({ item: buildItem() });
    expect(options.formEndpoint).toEqual(formEndpoint);
    expect(options.namespace).toEqual('reference/items/updateFindItem');
    expect(options.resourceName).toEqual('item');
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateFind');
  });
});
