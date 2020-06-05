import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

describe('ShowFindCondition store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { condition: buildCondition() },
      namespace: 'mechanics/conditions/showFindCondition',
      resourceName: 'condition',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
