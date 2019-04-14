import columns from './columns';

describe('Spells table columns', () => {
  it('should have the expected labels', () => {
    const labels = columns.map(column => column.label);
    const expected = [
      'Name',
      'School',
      'Level',
    ];

    expect(labels).toEqual(expected);
  });

  describe('Level', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.label === 'Level'));
      const expected = { label: 'Level', prop: 'level' };

      expect(matching).toEqual(expected);
    });
  });

  describe('Name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.label === 'Name'));
      const expected = { label: 'Name', prop: 'name' };

      expect(matching).toEqual(expected);
    });
  });

  describe('School', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.label === 'School'));
      const expected = { label: 'School', prop: 'school' };

      expect(matching).toEqual(expected);
    });
  });
});
