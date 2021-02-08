import {
  pastTense,
  progressiveTense,
} from './inflector';
import { capitalize } from './string';

const shouldMatchTheCase = ({ fn, original, inflected }) => {
  describe('with a lowercase word', () => {
    it('should inflect the word', () => {
      expect(fn(original.toLowerCase())).toEqual(inflected.toLowerCase());
    });
  });

  describe('with a capitalized word', () => {
    it('should inflect the word', () => {
      expect(fn(capitalize(original))).toEqual(capitalize(inflected));
    });
  });

  describe('with an uppercase word', () => {
    it('should inflect the word', () => {
      expect(fn(original.toUpperCase())).toEqual(inflected.toUpperCase());
    });
  });
};

describe('String inflector', () => {
  describe('pastTense', () => {
    it('should be a function', () => {
      expect(typeof pastTense).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(pastTense(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(pastTense(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(pastTense('')).toEqual('');
      });
    });

    shouldMatchTheCase({
      fn: pastTense,
      original: 'process',
      inflected: 'processed',
    });

    describe('with a word ending in "e"', () => {
      shouldMatchTheCase({
        fn: pastTense,
        original: 'create',
        inflected: 'created',
      });
    });

    describe('with a word ending in "ind"', () => {
      shouldMatchTheCase({
        fn: pastTense,
        original: 'find',
        inflected: 'found',
      });
    });

    describe('with a word ending in "y"', () => {
      shouldMatchTheCase({
        fn: pastTense,
        original: 'destroy',
        inflected: 'destroyed',
      });
    });
  });

  describe('progressiveTense', () => {
    it('should be a function', () => {
      expect(typeof progressiveTense).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(progressiveTense(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(progressiveTense(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(progressiveTense('')).toEqual('');
      });
    });

    shouldMatchTheCase({
      fn: progressiveTense,
      original: 'find',
      inflected: 'finding',
    });

    describe('with a word ending in "e"', () => {
      shouldMatchTheCase({
        fn: progressiveTense,
        original: 'create',
        inflected: 'creating',
      });
    });

    describe('with a word ending in a consonant and "t"', () => {
      shouldMatchTheCase({
        fn: progressiveTense,
        original: 'subtract',
        inflected: 'subtracting',
      });
    });

    describe('with a word ending in a vowel and "t"', () => {
      shouldMatchTheCase({
        fn: progressiveTense,
        original: 'format',
        inflected: 'formatting',
      });
    });
  });
});
