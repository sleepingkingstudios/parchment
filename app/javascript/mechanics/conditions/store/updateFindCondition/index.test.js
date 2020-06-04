import endpoint from './index';
import { buildMechanic } from '../../../entities';
import formEndpoint from '../updateConditionForm';

const buildCondition = () => Object.assign(buildMechanic(), { type: 'Mechanics::Condition' });

describe('UpdateFindCondition store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options.data).toEqual({ mechanic: buildCondition() });
    expect(options.formEndpoint).toEqual(formEndpoint);
    expect(options.namespace).toEqual('mechanics/conditions/updateFindCondition');
    expect(options.resourceName).toEqual('condition');
  });

  it('should map the data', () => {
    const { mapData } = options;
    const data = { condition: { name: 'Lethargy' } };
    const expected = { mechanic: { name: 'Lethargy' } };

    expect(typeof mapData).toEqual('function');

    expect(mapData(data)).toEqual(expected);
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateFind');
  });
});
