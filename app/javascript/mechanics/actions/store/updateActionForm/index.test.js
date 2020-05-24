import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

describe('UpdateActionForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { mechanic: buildAction() },
      namespace: 'mechanics/actions/updateActionForm',
      resourceName: 'action',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateForm');
  });
});
