import columns from './columns';

describe('Books table columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'title',
      'publisherName',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(' ');
      expect(matching.value).toEqual(' ');
    });
  });

  describe('publisherName', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'publisherName'));

      expect(matching.label).toEqual('Publisher');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('title', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'title'));

      expect(matching.label).toEqual('Title');
      expect(matching.value).toBeUndefined();
    });
  });
});
