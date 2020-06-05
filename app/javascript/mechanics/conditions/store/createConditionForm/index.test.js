import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

describe('CreateConditionForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const data = { mechanic: buildCondition() };

    expect(options).toEqual({
      data,
      namespace: 'mechanics/conditions/createConditionForm',
      resourceName: 'condition',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/createForm');
  });
});
