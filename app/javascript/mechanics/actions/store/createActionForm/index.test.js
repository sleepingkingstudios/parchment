import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

describe('CreateActionForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const data = { mechanic: buildAction() };

    expect(options).toEqual({
      data,
      namespace: 'mechanics/actions/createActionForm',
      resourceName: 'action',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/createForm');
  });
});
