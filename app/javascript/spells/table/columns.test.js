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

      expect(matching.prop).toEqual('level');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('Name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.label === 'Name'));

      expect(matching.prop).toEqual('name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('School', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.label === 'School'));

      expect(matching.prop).toEqual('school');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ school: 'nullamancy' })).toEqual('Nullamancy');
    });
  });
});
