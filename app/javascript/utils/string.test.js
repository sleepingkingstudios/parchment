import {
  camelize,
  capitalize,
  interpolate,
  kebabize,
  safeCapitalize,
  slugify,
  titleize,
  truncate,
  underscore,
  upperCamelize,
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
      it('should return the string', () => {
        expect(camelize('greetings')).toEqual('greetings');
      });
    });

    describe('with a camelCase string', () => {
      it('should return the string', () => {
        expect(camelize('greetingsPrograms')).toEqual('greetingsPrograms');
      });
    });

    describe('with an underscored string', () => {
      it('should convert the string to camelCase', () => {
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

  describe('interpolate', () => {
    it('should be a function', () => {
      expect(typeof interpolate).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(interpolate(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(interpolate(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(interpolate('')).toEqual('');
      });
    });

    describe('with a string and a non-matching pattern', () => {
      it('should return the string', () => {
        const str = '/path/to/resource';
        const rxp = /:(\w+)/g;

        expect(interpolate(str, rxp, {})).toEqual(str);
      });
    });

    describe('with a string and matching pattern', () => {
      it('should interpolate the values', () => {
        const str = '/path/to/resource/:id/with?:option';
        const rxp = /:(\w+)/g;
        const params = { id: 0, option: 'option=value' };
        const expected = '/path/to/resource/0/with?option=value';

        expect(interpolate(str, rxp, params)).toEqual(expected);
      });
    });
  });

  describe('kebabize', () => {
    it('should be a function', () => {
      expect(typeof kebabize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(kebabize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(kebabize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(kebabize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should return the string', () => {
        expect(kebabize('greetings')).toEqual('greetings');
      });
    });

    describe('with a camelCase string', () => {
      it('should convert the string to kebab-case', () => {
        expect(kebabize('greetingsPrograms')).toEqual('greetings-programs');
      });
    });

    describe('with an underscored string', () => {
      it('should convert the string to kebab-case', () => {
        expect(kebabize('greetings_programs')).toEqual('greetings-programs');
      });
    });

    describe('with a kebab-case string', () => {
      it('should return the string', () => {
        expect(kebabize('greetings-programs')).toEqual('greetings-programs');
      });
    });

    describe('with a multiword string', () => {
      it('should convert the string to kebab-case', () => {
        expect(kebabize('Greetings Programs')).toEqual('greetings-programs');
      });
    });
  });

  describe('safeCapitalize', () => {
    it('should be a function', () => {
      expect(typeof safeCapitalize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(safeCapitalize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(safeCapitalize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(safeCapitalize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should return the capitalized string', () => {
        expect(safeCapitalize('lowercase')).toEqual('Lowercase');
      });
    });

    describe('with an uppercase string', () => {
      it('should return the uppercase string', () => {
        expect(safeCapitalize('UPPERCASE')).toEqual('UPPERCASE');
      });
    });

    describe('with a capitalized string', () => {
      it('should return the capitalized string', () => {
        expect(safeCapitalize('Capitalized')).toEqual('Capitalized');
      });
    });

    describe('with a mixed-case string', () => {
      it('should return the string with the first letter capitalized', () => {
        expect(safeCapitalize('mIxEdCaSe')).toEqual('MIxEdCaSe');
      });
    });
  });

  describe('slugify', () => {
    it('should be a function', () => {
      expect(typeof slugify).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(slugify(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(slugify(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(slugify('')).toEqual('');
      });
    });

    describe('with an invalid string', () => {
      it('should return an empty string', () => {
        expect(slugify('---')).toEqual('');
      });
    });

    describe('with a one-word string', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('Flumph')).toEqual('flumph');
      });
    });

    describe('with a multi-word string', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('Complete Flumph Manual')).toEqual('complete-flumph-manual');
      });
    });

    describe('with a string with leading and trailing whitespace', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('\n\tComplete Flumph Manual \n')).toEqual('complete-flumph-manual');
      });
    });

    describe('with a string with interstitial whitespace', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('Complete\tFlumph\tManual')).toEqual('complete-flumph-manual');
      });
    });

    describe('with a string with numbers', () => {
      it('should convert the string to kebab-case', () => {
        expect(
          slugify('Complete Flumph Manual 11th Edition'),
        ).toEqual('complete-flumph-manual-11th-edition');
      });
    });

    describe('with a string with non-letter characters', () => {
      it('should convert the string to kebab-case', () => {
        expect(
          slugify("Flumph Master's Guide"),
        ).toEqual('flumph-masters-guide');
      });
    });

    describe('with a string with ignored articles', () => {
      it('should convert the string to kebab-case', () => {
        expect(
          slugify('On The Origin of Flumphs, Revised Edition'),
        ).toEqual('origin-flumphs-revised-edition');
      });
    });

    describe('with a kebab-case string', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('complete-flumph-manual')).toEqual('complete-flumph-manual');
      });
    });

    describe('with an underscored string', () => {
      it('should convert the string to kebab-case', () => {
        expect(slugify('complete_flumph_manual')).toEqual('complete-flumph-manual');
      });
    });
  });

  describe('truncate', () => {
    it('should be a function', () => {
      expect(typeof truncate).toEqual('function');
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

  describe('titleize', () => {
    it('should be a function', () => {
      expect(typeof titleize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(titleize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(titleize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(titleize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should capitalize the string', () => {
        expect(titleize('greetings')).toEqual('Greetings');
      });
    });

    describe('with a multi-word string', () => {
      it('should capitalize the string', () => {
        expect(titleize('greetings programs')).toEqual('Greetings Programs');
      });
    });

    describe('with a camelCase string', () => {
      it('should capitalize the string', () => {
        expect(titleize('greetingsPrograms')).toEqual('Greetings Programs');
      });
    });

    describe('with an underscored string', () => {
      it('should capitalize the string', () => {
        expect(titleize('greetings_programs')).toEqual('Greetings Programs');
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
      it('should return the string', () => {
        expect(underscore('greetings')).toEqual('greetings');
      });
    });

    describe('with a camelCase string', () => {
      it('should convert the string to underscore_case', () => {
        expect(underscore('greetingsPrograms')).toEqual('greetings_programs');
      });
    });

    describe('with an underscored string', () => {
      it('should return the string', () => {
        expect(underscore('greetings_programs')).toEqual('greetings_programs');
      });
    });
  });

  describe('upperCamelize', () => {
    it('should be a function', () => {
      expect(typeof upperCamelize).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(upperCamelize(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(upperCamelize(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(upperCamelize('')).toEqual('');
      });
    });

    describe('with a lowercase string', () => {
      it('should capitalize the string', () => {
        expect(upperCamelize('greetings')).toEqual('Greetings');
      });
    });

    describe('with a camelCase string', () => {
      it('should capitalize the string', () => {
        expect(upperCamelize('greetingsPrograms')).toEqual('GreetingsPrograms');
      });
    });

    describe('with an underscored string', () => {
      it('should convert the string to upperCamelCase', () => {
        expect(upperCamelize('greetings_programs')).toEqual('GreetingsPrograms');
      });
    });
  });
});
