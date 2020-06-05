import ConditionsTableActions from './actions';
import columns from './columns';

describe('ConditionsTable columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'shortDescription',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
      expect(matching.value).toEqual(ConditionsTableActions);
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
