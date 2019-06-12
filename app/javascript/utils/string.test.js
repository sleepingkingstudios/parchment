import {
  capitalize,
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
});
