import {
  isNumber,
  shortOrdinal,
} from './number';

describe('Number utils', () => {
  describe('isNumber', () => {
    it('should be a function', () => {
      expect(typeof isNumber).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return false', () => {
        expect(isNumber(undefined)).toBe(false);
      });
    });

    describe('with null', () => {
      it('should return false', () => {
        expect(isNumber(null)).toBe(false);
      });
    });

    describe('with an object', () => {
      it('should return false', () => {
        expect(isNumber({ value: 5 })).toBe(false);
      });
    });

    describe('with an empty string', () => {
      it('should return false', () => {
        expect(isNumber('')).toBe(false);
      });
    });

    describe('with a numeric string', () => {
      it('should return false', () => {
        expect(isNumber('5')).toBe(false);
      });
    });

    describe('with an empty array', () => {
      it('should return false', () => {
        expect(isNumber([])).toBe(false);
      });
    });

    describe('with an array with a numeric value', () => {
      it('should return false', () => {
        expect(isNumber([1.0])).toBe(false);
      });
    });

    describe('with an integer', () => {
      it('should return true', () => {
        expect(isNumber(1)).toBe(true);
      });
    });

    describe('with a float', () => {
      it('should return true', () => {
        expect(isNumber(1.0)).toBe(true);
      });
    });

    describe('with NaN', () => {
      it('should return false', () => {
        expect(isNumber(NaN)).toBe(false);
      });
    });

    describe('with infinity', () => {
      it('should return true', () => {
        expect(isNumber(Infinity)).toBe(true);
      });
    });
  });

  describe('shortOrdinal', () => {
    it('should be a function', () => {
      expect(typeof shortOrdinal).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(shortOrdinal(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(shortOrdinal(null)).toEqual('');
      });
    });

    describe('with an object', () => {
      const object = { value: 5 };

      it('should return the object as a string', () => {
        expect(shortOrdinal(object)).toEqual(object.toString());
      });
    });

    describe('with an empty string', () => {
      it('should return the string', () => {
        expect(shortOrdinal('')).toEqual('');
      });
    });

    describe('with a non-numeric string', () => {
      const string = 'Do you know what your sin is?';

      it('should return the string', () => {
        expect(shortOrdinal(string)).toEqual(string);
      });
    });

    describe('with an integer', () => {
      const values = {
        0: '0th',
        1: '1st',
        2: '2nd',
        3: '3rd',
        4: '4th',
        10: '10th',
        11: '11th',
        12: '12th',
        13: '13th',
        14: '14th',
        20: '20th',
        21: '21st',
        22: '22nd',
        23: '23rd',
        24: '24th',
        100: '100th',
        101: '101st',
        102: '102nd',
        103: '103rd',
        104: '104th',
        110: '110th',
        111: '111th',
        112: '112th',
        113: '113th',
        114: '114th',
        120: '120th',
        121: '121st',
        122: '122nd',
        123: '123rd',
        124: '124th',
      };

      it('should return the integer with the ordinal suffix', () => {
        let key;
        let value;

        Object.entries(values).forEach((ary) => {
          [key, value] = ary;

          expect(shortOrdinal(parseInt(key, 10))).toEqual(value);
        });
      });
    });

    describe('with a float', () => {
      const float = 3.14;

      it('should return the rounded float with the ordinal suffix', () => {
        expect(shortOrdinal(float)).toEqual('3rd');
      });
    });
  });
});
