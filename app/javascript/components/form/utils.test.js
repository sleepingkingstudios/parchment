import { generateFieldId } from './utils';

describe('Form utils', () => {
  describe('generateFieldId()', () => {
    const prop = 'propertyName';
    const expected = 'property-name-input';

    it('should generate the field id', () => {
      expect(generateFieldId({ prop })).toEqual(expected);
    });

    describe('with an input id', () => {
      const inputId = 'custom-id';

      it('should generate the field id', () => {
        expect(generateFieldId({ inputId, prop })).toEqual(inputId);
      });
    });

    describe('with a namespace', () => {
      const namespace = 'rocket';

      it('should generate the field id', () => {
        expect(generateFieldId({ namespace, prop })).toEqual(`${namespace}-${expected}`);
      });
    });
  });
});
