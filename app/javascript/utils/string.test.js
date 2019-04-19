import {
  capitalize,
  truncate,
} from './string';

describe('String utils', () => {
  describe('capitalize', () => {
    it('should be a function', () => {
      expect(typeof capitalize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(capitalize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(capitalize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(capitalize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should return the capitalized string', () => {
        expect(capitalize('lowercase')).toEqual('Lowercase');
      });
    });

    describe('with an uppercase string', () => {
      it('should return the capitalized string', () => {
        expect(capitalize('UPPERCASE')).toEqual('Uppercase');
      });
    });

    describe('with a capitalized string', () => {
      it('should return the capitalized string', () => {
        expect(capitalize('Capitalized')).toEqual('Capitalized');
      });
    });

    describe('with a mixed-case string', () => {
      it('should return the capitalized string', () => {
        expect(capitalize('mIxEdCaSe')).toEqual('Mixedcase');
      });
    });
  });

  describe('truncate', () => {
    it('should be a function', () => {
      expect(typeof capitalize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(truncate(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(truncate(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(truncate('', 80)).toEqual('');
      });
    });

    describe('with a string shorter than the max length', () => {
      const str = 'What lies beyond the furthest reaches of the sky?';

      it('should return the string', () => {
        expect(truncate(str, 80)).toEqual(str);
      });
    });

    describe('with a string with length equal to the max length', () => {
      const str = '0123456789ABCDEF';

      it('should return the string', () => {
        expect(truncate(str, 16)).toEqual(str);
      });
    });

    describe('with a string longer than the max length', () => {
      const str = 'What lies beyond the furthest reaches of the sky?';
      const expected = 'What lies beyond the furthest reaches...';

      it('should return the string', () => {
        expect(truncate(str, 40)).toEqual(expected);
      });
    });
  });
});
