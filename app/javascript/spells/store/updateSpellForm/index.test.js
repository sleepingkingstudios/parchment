import endpoint from './index';
import { buildSpell } from '../../entities';

describe('UpdateSpellForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { spell: buildSpell() },
      resourceName: 'spell',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/updateForm');
  });
});
