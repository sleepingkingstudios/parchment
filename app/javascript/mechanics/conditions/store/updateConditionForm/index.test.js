import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

describe('UpdateConditionForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { mechanic: buildCondition() },
      namespace: 'mechanics/conditions/updateConditionForm',
      resourceName: 'condition',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateForm');
  });
});
