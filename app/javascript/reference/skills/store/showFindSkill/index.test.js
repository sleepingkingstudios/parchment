import endpoint from './index';
import { buildSkill } from '../../entities';

describe('ShowFindSkill store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { skill: buildSkill() },
      namespace: 'reference/skills/showFindSkill',
      resourceName: 'skill',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
