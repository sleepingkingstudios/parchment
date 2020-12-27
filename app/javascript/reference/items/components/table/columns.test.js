import ItemsTableActions from './actions';
import columns from './columns';

describe('ItemsTable columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'cost',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
      expect(matching.value).toEqual(ItemsTableActions);
    });
  });

  describe('cost', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'cost'));

      expect(matching.label).toEqual('Cost');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });
});
