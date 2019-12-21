import columns from './columns';
import SpellsTableActions from './actions';

describe('Spells table columns', () => {
  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'source',
      'school',
      'level',
      'description',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(' ');
      expect(matching.value).toEqual(SpellsTableActions);
    });
  });

  describe('description', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'description'));
      const description = 'What lies beyond the furthest reaches of the sky?';

      expect(matching.label).toEqual('Description');
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
        const description = "That which will lead the lost child back to her mother's arms. Exile";
        const expected = "That which will lead the lost child back to her mother's ...";

        expect(matching.value({ description })).toEqual(expected);
      });
    });
  });

  describe('level', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'level'));

      expect(matching.label).toEqual('Level');
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

  describe('school', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'school'));

      expect(matching.label).toEqual('School');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ school: 'nullamancy' })).toEqual('Nullamancy');
    });
  });

  describe('source', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'source'));

      expect(matching.label).toEqual('Source');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({})).toEqual('Homebrew');
    });

    describe('with a spell with a source', () => {
      const source = { name: "The Flumph Fancier's Handbook" };

      it('should have the expected properties', () => {
        const matching = columns.find(column => (column.prop === 'source'));

        expect(matching.label).toEqual('Source');
        expect(typeof matching.value).toEqual('function');
        expect(matching.value({ source })).toEqual(source.name);
      });
    });
  });
});
