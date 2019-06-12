import {
  camelize,
  capitalize,
  truncate,
  underscore,
} from './string';

describe('String utils', () => {
  describe('camelize', () => {
    it('should be a function', () => {
      expect(typeof camelize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(camelize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(camelize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(camelize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should return an empty string', () => {
        expect(camelize('greetings')).toEqual('greetings');
      });
    });

    describe('with a camel-case string', () => {
      it('should return an empty string', () => {
        expect(camelize('greetingsPrograms')).toEqual('greetingsPrograms');
      });
    });

    describe('with an underscored string', () => {
      it('should return an empty string', () => {
        expect(camelize('greetings_programs')).toEqual('greetingsPrograms');
      });
    });
  });

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

  describe('underscore', () => {
    it('should be a function', () => {
      expect(typeof underscore).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(underscore(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(underscore(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(underscore('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should return an empty string', () => {
        expect(underscore('greetings')).toEqual('greetings');
      });
    });

    describe('with a camel-case string', () => {
      it('should return an empty string', () => {
        expect(underscore('greetingsPrograms')).toEqual('greetings_programs');
      });
    });

    describe('with an underscored string', () => {
      it('should return an empty string', () => {
        expect(underscore('greetings_programs')).toEqual('greetings_programs');
      });
    });
  });
});
