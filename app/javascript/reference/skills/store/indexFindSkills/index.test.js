import endpoint from './index';

describe('IndexFindSkills store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { skills: [] },
      namespace: 'reference/skills/indexFindSkills',
      resourceName: 'skills',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/index');
  });
});
