import endpoint from './index';
import { buildMechanic } from '../../../entities';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });

describe('ShowFindAction store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { action: buildAction() },
      namespace: 'mechanics/actions/showFindAction',
      resourceName: 'action',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
