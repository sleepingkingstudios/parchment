import {
  coerceInputValue,
  formatErrors,
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

  describe('formatErrors()', () => {
    it('should be a function', () => {
      expect(typeof formatErrors).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty object', () => {
        expect(formatErrors(undefined)).toEqual({});
      });
    });

    describe('with null', () => {
      it('should return an empty object', () => {
        expect(formatErrors(null)).toEqual({});
      });
    });

    describe('with an empty array', () => {
      const err = [];

      it('should return an empty object', () => {
        expect(formatErrors(err)).toEqual({});
      });
    });

    describe('with an array with one errors tuple', () => {
      const err = [['who', 'is on first']];

      it('should convert the errors to an object with array values', () => {
        expect(formatErrors(err)).toEqual({ who: ['is on first'] });
      });
    });

    describe('with an array with an errors tuple with underscored prop', () => {
      const err = [['i_dont_know', 'is on third']];

      it('should convert the prop to camelCase', () => {
        expect(formatErrors(err)).toEqual({ iDontKnow: ['is on third'] });
      });
    });

    describe('with an array with multiple errors tuples', () => {
      const err = [
        ['who', 'is on first'],
        ['what', 'is on second'],
        ['i_dont_know', 'is on third'],
        ['i_dont_know', "we're not talking about him"],
      ];
      const expected = {
        who: ['is on first'],
        what: ['is on second'],
        iDontKnow: ['is on third', "we're not talking about him"],
      };

      it('should group the errors', () => {
        expect(formatErrors(err)).toEqual(expected);
      });
    });
  });

  describe('generateFieldId()', () => {
    const prop = 'propertyName';

    it('should generate the field id', () => {
      const expected = 'property-name-input';

      expect(generateFieldId({ prop })).toEqual(expected);
    });

    describe('with an input id', () => {
      const inputId = 'custom-id';

      it('should generate the field id', () => {
        expect(generateFieldId({ inputId, prop })).toEqual(inputId);
      });
    });

    describe('with a path', () => {
      const path = ['weapons', 'swords', 'japanese'];
      const expected = 'weapons-swords-japanese-property-name-input';

      it('should generate the field id', () => {
        expect(generateFieldId({ path, prop })).toEqual(expected);
      });
    });

    describe('with a suffix', () => {
      const suffix = 'field';
      const expected = 'property-name-field';

      it('should generate the field id', () => {
        expect(generateFieldId({ prop, suffix })).toEqual(expected);
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
