import endpoint from './index';
import { buildMechanic } from '../../../entities';
import formEndpoint from '../updateActionForm';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

describe('UpdateFindAction store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options.data).toEqual({ mechanic: buildAction() });
    expect(options.formEndpoint).toEqual(formEndpoint);
    expect(options.namespace).toEqual('mechanics/actions/updateFindAction');
    expect(options.resourceName).toEqual('action');
  });

  it('should map the data', () => {
    const { mapData } = options;
    const data = { action: { name: 'Self-Destruct' } };
    const expected = { mechanic: { name: 'Self-Destruct' } };

    expect(typeof mapData).toEqual('function');

    expect(mapData(data)).toEqual(expected);
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateFind');
  });
});
