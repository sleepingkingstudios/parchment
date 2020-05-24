import {
  pastTense,
  progressiveTense,
} from './inflector';

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

    describe('with a lowercase word', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('process')).toEqual('processed');
      });
    });

    describe('with a capitalized word', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('Process')).toEqual('Processed');
      });
    });

    describe('with an uppercase word', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('PROCESS')).toEqual('PROCESSED');
      });
    });

    describe('with a lowercase word ending in "e"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('create')).toEqual('created');
      });
    });

    describe('with a capitalized word ending in "e"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('Create')).toEqual('Created');
      });
    });

    describe('with an uppercase word ending in "e"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('CREATE')).toEqual('CREATED');
      });
    });

    describe('with a lowercase word ending in "ind"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('find')).toEqual('found');
      });
    });

    describe('with a capitalized word ending in "ind"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('Find')).toEqual('Found');
      });
    });

    describe('with an uppercase word ending in "ind"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('FIND')).toEqual('FOUND');
      });
    });

    describe('with a lowercase word ending in "y"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('destroy')).toEqual('destroyed');
      });
    });

    describe('with a capitalized word ending in "y"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('Destroy')).toEqual('Destroyed');
      });
    });

    describe('with an uppercase word ending in "y"', () => {
      it('should convert the word to past tense', () => {
        expect(pastTense('DESTROY')).toEqual('DESTROYED');
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

    describe('with a lowercase word', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('find')).toEqual('finding');
      });
    });

    describe('with a capitalized word', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('find')).toEqual('finding');
      });
    });

    describe('with an uppercase word', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('FIND')).toEqual('FINDING');
      });
    });

    describe('with a lowercase word ending in "e"', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('create')).toEqual('creating');
      });
    });

    describe('with a capitalized word ending in "e"', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('Create')).toEqual('Creating');
      });
    });

    describe('with an uppercase word ending in "e"', () => {
      it('should convert the word to progressive tense', () => {
        expect(progressiveTense('Create')).toEqual('Creating');
      });
    });
  });
});
