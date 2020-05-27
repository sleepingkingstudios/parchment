import columns from './columns';
import ResponsiveSchool from './responsive-school';
import SpellsTableActions from './actions';

describe('Spells table columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'school',
      'actions',
      'description',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
      expect(matching.value).toEqual(SpellsTableActions);
    });
  });

  describe('description', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'description'));
      const description = 'What lies beyond the furthest reaches of the sky?';

      expect(matching.label).toEqual(false);
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ description })).toEqual(description);
    });

    describe('with a spell with a short description', () => {
      it('should set the value to the short description', () => {
        const matching = columns.find(column => (column.prop === 'description'));
        const description = 'What lies beyond the furthest reaches of the sky?';
        const shortDescription = 'The First Mysterium';

        expect(matching.value({ description, shortDescription })).toEqual(shortDescription);
      });
    });

    describe('with a spell with a description that is too long', () => {
      it('should set the value to the truncated description', () => {
        const matching = columns.find(column => (column.prop === 'description'));
        const description = 'What lies beyond the furthest reaches of the sky?'
          + " That which will lead the lost child back to her mother's arms."
          + ' Exile.';
        const expected = `${description.slice(0, 77)}...`;

        expect(matching.value({ description })).toEqual(expected);
      });
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('school', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'school'));

      expect(matching.label).toEqual('School');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value).toBe(ResponsiveSchool);
    });
  });
});
