import endpoint from './index';
import { buildItem } from '../../entities';

describe('ShowFindSkill store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { item: buildItem() },
      namespace: 'reference/items/showFindItem',
      resourceName: 'item',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
