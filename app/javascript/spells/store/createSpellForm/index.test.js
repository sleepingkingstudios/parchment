import endpoint from './index';
import { buildSpell } from '../../entities';

describe('CreateSpellForm store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    const data = { spell: buildSpell() };

    expect(options).toEqual({
      data,
      resourceName: 'spell',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/createForm');
  });
});
