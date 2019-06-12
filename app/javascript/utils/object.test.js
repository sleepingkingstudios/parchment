import {
  camelizeKeys,
  underscoreKeys,
} from './object';

const dataWithCamelizedKeys = {
  firstKey: 0,
  secondKey: 1,
  thirdKey: 2,
  objectKey: {
    innerKey: 0,
  },
  arrayKey: [
    {
      innerKey: 0,
    },
    {
      innerKey: 1,
    },
    {
      innerKey: 2,
    },
  ],
};
const dataWithUnderscoredKeys = {
  first_key: 0,
  second_key: 1,
  third_key: 2,
  object_key: {
    inner_key: 0,
  },
  array_key: [
    {
      inner_key: 0,
    },
    {
      inner_key: 1,
    },
    {
      inner_key: 2,
    },
  ],
};

describe('Object utils', () => {
  describe('camelizeKeys()', () => {
    it('should be a function', () => {
      expect(typeof camelizeKeys).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty object', () => {
        expect(camelizeKeys(undefined)).toEqual({});
      });
    });

    describe('with null', () => {
      it('should return an empty object', () => {
        expect(camelizeKeys(null)).toEqual({});
      });
    });

    describe('with an empty object', () => {
      it('should return an empty object', () => {
        expect(camelizeKeys({})).toEqual({});
      });
    });

    describe('with an object with underscore-formatted keys', () => {
      const obj = {
        first_key: 0,
        second_key: 1,
        third_key: 2,
      };
      const expected = {
        firstKey: 0,
        secondKey: 1,
        thirdKey: 2,
      };

      it('should convert the keys to camel case', () => {
        expect(camelizeKeys(obj)).toEqual(expected);
      });

      it('should not change the object', () => {
        camelizeKeys(obj);

        expect(obj.first_key).toEqual(0);
      });
    });

    describe('with an object with nested, underscore-formatted keys', () => {
      const obj = dataWithUnderscoredKeys;
      const expected = dataWithCamelizedKeys;

      it('should convert the keys to camel case', () => {
        expect(camelizeKeys(obj)).toEqual(expected);
      });
    });
  });

  describe('underscoreKeys()', () => {
    it('should be a function', () => {
      expect(typeof underscoreKeys).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty object', () => {
        expect(underscoreKeys(undefined)).toEqual({});
      });
    });

    describe('with null', () => {
      it('should return an empty object', () => {
        expect(underscoreKeys(null)).toEqual({});
      });
    });

    describe('with an empty object', () => {
      it('should return an empty object', () => {
        expect(underscoreKeys({})).toEqual({});
      });
    });

    describe('with an object with camelCase-formatted keys', () => {
      const obj = {
        firstKey: 0,
        secondKey: 1,
        thirdKey: 2,
      };
      const expected = {
        first_key: 0,
        second_key: 1,
        third_key: 2,
      };

      it('should convert the keys to underscore case', () => {
        expect(underscoreKeys(obj)).toEqual(expected);
      });

      it('should not change the object', () => {
        underscoreKeys(obj);

        expect(obj.firstKey).toEqual(0);
      });
    });

    describe('with an object with nested, camelCase-formatted keys', () => {
      const obj = dataWithCamelizedKeys;
      const expected = dataWithUnderscoredKeys;

      it('should convert the keys to underscore case', () => {
        expect(underscoreKeys(obj)).toEqual(expected);
      });
    });
  });
});
