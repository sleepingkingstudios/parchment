import LanguagesTableActions from './actions';
import columns from './columns';

describe('LanguagesTable columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'speakers',
      'rarity',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
      expect(matching.value).toEqual(LanguagesTableActions);
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('rarity', () => {
    it('should have the expected properties', () => {
      const rarity = 'exotic';
      const matching = columns.find(column => (column.prop === 'rarity'));

      expect(matching.label).toEqual('Rarity');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ rarity })).toEqual('Exotic');
    });
  });

  describe('speakers', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'speakers'));

      expect(matching.label).toEqual('Speakers');
      expect(matching.value).toBeUndefined();
    });
  });
});
