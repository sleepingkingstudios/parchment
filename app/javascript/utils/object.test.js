import {
  camelizeKeys,
  deepAccessProperty,
  deepAssignProperty,
  underscoreKeys,
  valueOrDefault,
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

  describe('deepAccessProperty()', () => {
    it('should be a function', () => {
      expect(typeof deepAccessProperty).toEqual('function');
    });

    describe('with an empty Array', () => {
      const propName = 1;

      describe('with path: empty Array', () => {
        const obj = [];

        it('should return null', () => {
          expect(deepAccessProperty(obj, propName, [])).toEqual(null);
        });
      });
    });

    describe('with an Array with data', () => {
      const propName = 1;

      describe('with path: empty Array', () => {
        const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];

        it('should return the value', () => {
          expect(deepAccessProperty(obj, propName, [])).toEqual(obj[propName]);
        });
      });
    });

    describe('with an empty Object', () => {
      const propName = 'name';

      describe('with path: empty Array', () => {
        const obj = {};

        it('should return null', () => {
          expect(deepAccessProperty(obj, propName, [])).toEqual(null);
        });
      });

      describe('with path: array with a string value', () => {
        const obj = {};
        const path = ['manager'];

        it('should return null', () => {
          expect(deepAccessProperty(obj, propName, path)).toEqual(null);
        });
      });

      describe('with path: array with multiple string values', () => {
        const obj = {};
        const path = ['teams', 'engineering', 'manager'];

        it('should return null', () => {
          expect(deepAccessProperty(obj, propName, path)).toEqual(null);
        });
      });
    });

    describe('with an Object with data', () => {
      const propName = 'name';

      describe('with path: empty array', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };

        it('should return the value', () => {
          expect(deepAccessProperty(obj, propName, [])).toEqual(obj[propName]);
        });
      });

      describe('with path: array with a string value', () => {
        const obj = {
          division: 'Product',
          manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
        };
        const path = ['manager'];
        const value = obj.manager[propName];

        it('should return the value', () => {
          expect(deepAccessProperty(obj, propName, path)).toEqual(value);
        });
      });

      describe('with path: array with multiple string values', () => {
        const obj = {
          company: 'Encom',
          teams: {
            engineering: {
              division: 'Product',
              manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
            },
            marketing: {
              division: 'Corporate',
            },
          },
        };
        const path = ['teams', 'engineering', 'manager'];
        const value = obj.teams.engineering.manager[propName];

        it('should return the value', () => {
          expect(deepAccessProperty(obj, propName, path)).toEqual(value);
        });
      });

      describe('with path: array with mixed string and number values', () => {
        const obj = {
          company: 'Encom',
          teams: [
            {
              employees: [],
              name: 'marketing',
            },
            {
              employees: [
                { name: 'Kevin Flynn', title: 'Programmer' },
                { name: 'Ed Dillinger', title: 'Technical Lead' },
                { name: 'Lora', title: 'Technical Lead' },
              ],
              name: 'engineering',
            },
            {
              employees: [],
              name: 'sales',
            },
          ],
        };
        const path = ['teams', 1, 'employees', 1];
        const value = obj.teams[1].employees[1][propName];

        it('should return the value', () => {
          expect(deepAccessProperty(obj, propName, path)).toEqual(value);
        });
      });
    });
  });

  describe('deepAssignProperty()', () => {
    const value = 'Alan Bradley';

    it('should be a function', () => {
      expect(typeof deepAssignProperty).toEqual('function');
    });

    describe('with an empty Array', () => {
      const obj = [];
      const propName = 1;

      describe('with path: empty array', () => {
        const path = [];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);

          expect(returned).toEqual([undefined, value]);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual([]);
        });
      });
    });

    describe('with an Array with data', () => {
      const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];
      const propName = 1;

      describe('with path: empty array', () => {
        const path = [];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = ['Kevin Flynn', value, 'Lora'];

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual(['Kevin Flynn', 'Ed Dillinger', 'Lora']);
        });
      });
    });

    describe('with an empty Object', () => {
      const propName = 'name';

      describe('with path: empty array', () => {
        const obj = {};
        const path = [];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);

          expect(returned).toEqual({ name: value });
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({});
        });
      });

      describe('with path: array with a string value', () => {
        const obj = {};
        const path = ['manager'];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);

          expect(returned).toEqual({ manager: { name: value } });
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({});
        });
      });

      describe('with path: array with multiple string values', () => {
        const obj = {};
        const path = ['teams', 'engineering', 'manager'];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = {
            teams: {
              engineering: {
                manager: { name: value },
              },
            },
          };

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({});
        });
      });

      describe('with path: array with mixed string and number values', () => {
        const obj = {};
        const path = ['teams', 1, 'employees', 1];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = {
            teams: [
              undefined,
              {
                employees: [
                  undefined,
                  { name: value },
                ],
              },
            ],
          };

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({});
        });
      });
    });

    describe('with an object with data', () => {
      const propName = 'name';

      describe('with path: empty array', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };
        const path = [];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);

          expect(returned).toEqual({ name: value, title: 'Technical Lead' });
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({ name: 'Ed Dillinger', title: 'Technical Lead' });
        });
      });

      describe('with path: array with a string value', () => {
        const obj = {
          division: 'Product',
          manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
        };
        const path = ['manager'];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = {
            division: 'Product',
            manager: { name: value, title: 'Technical Lead' },
          };

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({
            division: 'Product',
            manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
          });
        });
      });

      describe('with path: array with multiple string values', () => {
        const obj = {
          company: 'Encom',
          teams: {
            engineering: {
              division: 'Product',
              manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
            },
            marketing: {
              division: 'Corporate',
            },
          },
        };
        const path = ['teams', 'engineering', 'manager'];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = {
            company: 'Encom',
            teams: {
              engineering: {
                division: 'Product',
                manager: { name: value, title: 'Technical Lead' },
              },
              marketing: {
                division: 'Corporate',
              },
            },
          };

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({
            company: 'Encom',
            teams: {
              engineering: {
                division: 'Product',
                manager: { name: 'Ed Dillinger', title: 'Technical Lead' },
              },
              marketing: {
                division: 'Corporate',
              },
            },
          });
        });
      });

      describe('with path: array with mixed string and number values', () => {
        const obj = {
          company: 'Encom',
          teams: [
            {
              employees: [],
              name: 'marketing',
            },
            {
              employees: [
                { name: 'Kevin Flynn', title: 'Programmer' },
                { name: 'Ed Dillinger', title: 'Technical Lead' },
                { name: 'Lora', title: 'Technical Lead' },
              ],
              name: 'engineering',
            },
            {
              employees: [],
              name: 'sales',
            },
          ],
        };
        const path = ['teams', 1, 'employees', 1];

        it('should assign the property to a copy', () => {
          const returned = deepAssignProperty(obj, propName, value, path);
          const expected = {
            company: 'Encom',
            teams: [
              {
                employees: [],
                name: 'marketing',
              },
              {
                employees: [
                  { name: 'Kevin Flynn', title: 'Programmer' },
                  { name: value, title: 'Technical Lead' },
                  { name: 'Lora', title: 'Technical Lead' },
                ],
                name: 'engineering',
              },
              {
                employees: [],
                name: 'sales',
              },
            ],
          };

          expect(returned).toEqual(expected);
        });

        it('should not mutate the original object', () => {
          deepAssignProperty(obj, propName, value, path);

          expect(obj).toEqual({
            company: 'Encom',
            teams: [
              {
                employees: [],
                name: 'marketing',
              },
              {
                employees: [
                  { name: 'Kevin Flynn', title: 'Programmer' },
                  { name: 'Ed Dillinger', title: 'Technical Lead' },
                  { name: 'Lora', title: 'Technical Lead' },
                ],
                name: 'engineering',
              },
              {
                employees: [],
                name: 'sales',
              },
            ],
          });
        });
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

  describe('valueOrDefault()', () => {
    const defaultValue = 'default value';

    it('should be a function', () => {
      expect(typeof valueOrDefault).toEqual('function');
    });

    describe('with null', () => {
      it('should return null', () => {
        expect(valueOrDefault(null)).toBe(null);
      });
    });

    describe('with null and a default value', () => {
      it('should return the default value', () => {
        expect(valueOrDefault(null, defaultValue)).toBe(defaultValue);
      });
    });

    describe('with undefined', () => {
      it('should return null', () => {
        expect(valueOrDefault(undefined)).toBe(null);
      });
    });

    describe('with undefined and a default value', () => {
      it('should return the default value', () => {
        expect(valueOrDefault(undefined, defaultValue)).toBe(defaultValue);
      });
    });

    describe('with an array', () => {
      const value = [];

      it('should return the array', () => {
        expect(valueOrDefault(value)).toBe(value);
      });
    });

    describe('with an array and a default value', () => {
      const value = [];

      it('should return the array', () => {
        expect(valueOrDefault(value, defaultValue)).toBe(value);
      });
    });

    describe('with an object', () => {
      const value = {};

      it('should return the object', () => {
        expect(valueOrDefault(value)).toBe(value);
      });
    });

    describe('with an object and a default value', () => {
      const value = {};

      it('should return the object', () => {
        expect(valueOrDefault(value, defaultValue)).toBe(value);
      });
    });

    describe('with a number', () => {
      const value = 3;

      it('should return the number', () => {
        expect(valueOrDefault(value)).toBe(value);
      });
    });

    describe('with a number and a default value', () => {
      const value = 3;

      it('should return the number', () => {
        expect(valueOrDefault(value, defaultValue)).toBe(value);
      });
    });

    describe('with a string', () => {
      const value = 'string value';

      it('should return the string', () => {
        expect(valueOrDefault(value)).toBe(value);
      });
    });

    describe('with a string and a default value', () => {
      const value = 'string value';

      it('should return the string', () => {
        expect(valueOrDefault(value, defaultValue)).toBe(value);
      });
    });
  });
});
