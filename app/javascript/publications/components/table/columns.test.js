import columns from './columns';
import PublicationsTableActions from './actions';

describe('Publications table columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'publisherName',
      'publicationDate',
      'playtest',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(' ');
      expect(matching.value).toEqual(PublicationsTableActions);
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('playtest', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'playtest'));

      expect(matching.label).toEqual('Playtest');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('publicationDate', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'publicationDate'));

      expect(matching.label).toEqual('Date');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('publisherName', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'publisherName'));

      expect(matching.label).toEqual('Publisher');
      expect(matching.value).toBeUndefined();
    });
  });
});
