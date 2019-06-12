import {
  coerceInputValue,
  generateFieldId,
  getInputValue,
} from './utils';

describe('Form utils', () => {
  describe('coerceInputValue', () => {
    const handler = jest.fn();
    const fn = str => str.toUpperCase();

    it('should be a function', () => {
      expect(typeof coerceInputValue).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof coerceInputValue(handler, fn)).toEqual('function');
    });

    it('should coerce the value and call the handler', () => {
      const value = 'input value';
      const event = { target: { value } };

      coerceInputValue(handler, fn)(event);

      expect(handler).toHaveBeenCalledWith({ target: { value: fn(value) } });
    });
  });

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

  describe('getInputValue()', () => {
    describe('with a checkbox input', () => {
      describe('with checked: false', () => {
        const checkbox = { checked: false, type: 'checkbox' };

        it('should return false', () => {
          expect(getInputValue(checkbox)).toBe(false);
        });
      });

      describe('with checked: true', () => {
        const checkbox = { checked: true, type: 'checkbox' };

        it('should return false', () => {
          expect(getInputValue(checkbox)).toBe(true);
        });
      });
    });

    describe('with a text input', () => {
      const value = 'Input Value';
      const input = { type: 'text', value };

      it('should return the value', () => {
        expect(getInputValue(input)).toBe(value);
      });
    });
  });
});
