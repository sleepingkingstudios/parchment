import endpoint from './index';
import { buildMechanic } from '../../../entities';

describe('ShowFindAction store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { action: Object.assign(buildMechanic(), { type: 'Action' }) },
      namespace: 'mechanics/actions/showFindAction',
      resourceName: 'action',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
