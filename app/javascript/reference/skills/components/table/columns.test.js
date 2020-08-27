import columns from './columns';

describe('SkillsTable columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'abilityScore',
      'actions',
      'shortDescription',
    ];

    expect(props).toEqual(expected);
  });

  describe('abilityScore', () => {
    it('should have the expected properties', () => {
      const abilityScore = 'charisma';
      const matching = columns.find(column => (column.prop === 'abilityScore'));

      expect(matching.label).toEqual('Ability Score');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ abilityScore })).toEqual('Charisma');
    });
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
      expect(matching.value).toEqual(null);
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('shortDescription', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'shortDescription'));

      expect(matching.label).toEqual('Description');
      expect(matching.value).toBeUndefined();
    });
  });
});
