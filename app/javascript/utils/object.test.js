import {
  assign,
  camelizeKeys,
  dig,
  exists,
  isEmpty,
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
  describe('assign', () => {
    const value = '$100,000';

    it('should be a function', () => {
      expect(typeof assign).toEqual('function');
    });

    describe('with an empty path', () => {
      const obj = {};

      it('should throw an error', () => {
        expect(() => {
          assign(obj, value);
        }).toThrow("path can't be blank");
      });
    });

    describe('with an empty array', () => {
      describe('with path: one non-matching number', () => {
        const obj = [];
        const expected = [undefined, undefined, undefined, value];

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
        const obj = [];

        it('should throw an error', () => {
          expect(() => {
            assign(obj, value, 'formerEmployees');
          }).toThrow('invalid Array index formerEmployees');
        });
      });

      describe('with path: many non-matching items', () => {
        const obj = [];
        const expected = [
          undefined,
          undefined,
          undefined,
          {
            formerEmployees: [undefined, undefined, undefined, value],
          },
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 3, 'formerEmployees', 3)).toEqual(expected);
        });
      });
    });

    describe('with an array with flat data', () => {
      describe('with path: one non-matching number', () => {
        const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];
        const expected = ['Kevin Flynn', 'Ed Dillinger', 'Lora', value];

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
        const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];

        it('should throw an error', () => {
          expect(() => {
            assign(obj, value, 'formerEmployees');
          }).toThrow('invalid Array index formerEmployees');
        });
      });

      describe('with path: many non-matching items', () => {
        const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];
        const expected = [
          'Kevin Flynn',
          'Ed Dillinger',
          'Lora',
          {
            formerEmployees: [undefined, undefined, undefined, value],
          },
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 3, 'formerEmployees', 3)).toEqual(expected);
        });
      });

      describe('with path: one matching number', () => {
        const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];
        const expected = ['Kevin Flynn', 'Ed Dillinger', 'Lora', value];

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });
    });

    describe('with an array with nested data', () => {
      describe('with path: one non-matching number', () => {
        const obj = [
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
        ];
        const expected = [
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
          value,
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
        const obj = [
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
        ];

        it('should throw an error', () => {
          expect(() => {
            assign(obj, value, 'formerEmployees');
          }).toThrow('invalid Array index formerEmployees');
        });
      });

      describe('with path: many non-matching items', () => {
        const obj = [
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
        ];
        const expected = [
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
          {
            formerEmployees: [undefined, undefined, undefined, value],
          },
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 3, 'formerEmployees', 3)).toEqual(expected);
        });
      });

      describe('with path: one matching number', () => {
        const obj = [
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
        ];
        const expected = [
          {
            employees: [],
            name: 'marketing',
          },
          value,
          {
            employees: [],
            name: 'sales',
          },
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 1)).toEqual(expected);
        });
      });

      describe('with path: many matching items', () => {
        const obj = [
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
        ];
        const expected = [
          {
            employees: [],
            name: 'marketing',
          },
          {
            employees: [
              { name: 'Kevin Flynn', title: 'Programmer' },
              { name: 'Ed Dillinger', title: 'Technical Lead', salary: value },
              { name: 'Lora', title: 'Technical Lead' },
            ],
            name: 'engineering',
          },
          {
            employees: [],
            name: 'sales',
          },
        ];

        it('should insert the value', () => {
          expect(assign(obj, value, 1, 'employees', 1, 'salary')).toEqual(expected);
        });
      });
    });

    describe('with an empty object', () => {
      describe('with path: one non-matching number', () => {
        const obj = {};
        const expected = { 3: value };

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
        const obj = {};
        const expected = { salary: value };

        it('should insert the value', () => {
          expect(assign(obj, value, 'salary')).toEqual(expected);
        });
      });

      describe('with path: many non-matching items', () => {
        const obj = {};
        const expected = {
          formerEmployees: [
            undefined,
            undefined,
            undefined,
            { salary: value },
          ],
        };

        it('should insert the value', () => {
          expect(
            assign(obj, value, 'formerEmployees', 3, 'salary'),
          ).toEqual(expected);
        });
      });
    });

    describe('with an object with flat data', () => {
      describe('with path: one non-matching number', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };
        const expected = {
          name: 'Ed Dillinger',
          title: 'Technical Lead',
          3: value,
        };

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };
        const expected = {
          name: 'Ed Dillinger',
          title: 'Technical Lead',
          salary: value,
        };

        it('should insert the value', () => {
          expect(assign(obj, value, 'salary')).toEqual(expected);
        });
      });

      describe('with path: many non-matching items', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };
        const expected = {
          name: 'Ed Dillinger',
          title: 'Technical Lead',
          formerEmployees: [
            undefined,
            undefined,
            undefined,
            { salary: value },
          ],
        };

        it('should insert the value', () => {
          expect(
            assign(obj, value, 'formerEmployees', 3, 'salary'),
          ).toEqual(expected);
        });
      });

      describe('with path: one matching string', () => {
        const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };
        const expected = { name: 'Ed Dillinger', title: value };

        it('should insert the value', () => {
          expect(assign(obj, value, 'title')).toEqual(expected);
        });
      });
    });

    describe('with an object with nested data', () => {
      describe('with path: one non-matching number', () => {
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
        const expected = Object.assign(obj, { 3: value });

        it('should insert the value', () => {
          expect(assign(obj, value, 3)).toEqual(expected);
        });
      });

      describe('with path: one non-matching string', () => {
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
        const expected = Object.assign(obj, { salary: value });

        it('should insert the value', () => {
          expect(assign(obj, value, 'salary')).toEqual(expected);
        });
      });

      describe('with path: many non-matching items', () => {
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
        const expected = Object.assign(obj, {
          formerEmployees: [
            undefined,
            undefined,
            undefined,
            { salary: value },
          ],
        });

        it('should insert the value', () => {
          expect(
            assign(obj, value, 'formerEmployees', 3, 'salary'),
          ).toEqual(expected);
        });
      });

      describe('with path: one matching string', () => {
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
        const expected = Object.assign(obj, { company: value });

        it('should insert the value', () => {
          expect(assign(obj, value, 'company')).toEqual(expected);
        });
      });

      describe('with path: many matching items', () => {
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
                {
                  name: 'Ed Dillinger',
                  title: 'Technical Lead',
                  salary: value,
                },
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

        it('should insert the value', () => {
          expect(assign(obj, value, 'teams', 1, 'employees', 1, 'salary')).toEqual(expected);
        });
      });
    });
  });

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

  describe('dig', () => {
    it('should be a function', () => {
      expect(typeof dig).toEqual('function');
    });

    describe('with an empty array', () => {
      const obj = [];

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 3)).toEqual(null);
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 3, 'formerEmployees', 3)).toEqual(null);
        });
      });
    });

    describe('with an array with flat data', () => {
      const obj = ['Kevin Flynn', 'Ed Dillinger', 'Lora'];

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 3)).toEqual(null);
        });
      });

      describe('with path: one matching item', () => {
        it('should return the value', () => {
          expect(dig(obj, 1)).toEqual('Ed Dillinger');
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 3, 'formerEmployees', 3)).toEqual(null);
        });
      });

      describe('with path: mixed matching and non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 1, 'formerEmployees', 3)).toEqual(null);
        });
      });
    });

    describe('with an array with nested data', () => {
      const obj = [
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
      ];

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 3)).toEqual(null);
        });
      });

      describe('with path: one matching item', () => {
        const expected = {
          employees: [
            { name: 'Kevin Flynn', title: 'Programmer' },
            { name: 'Ed Dillinger', title: 'Technical Lead' },
            { name: 'Lora', title: 'Technical Lead' },
          ],
          name: 'engineering',
        };

        it('should return the value', () => {
          expect(dig(obj, 1)).toEqual(expected);
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 3, 'formerEmployees', 3)).toEqual(null);
        });
      });

      describe('with path: mixed matching and non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 1, 'formerEmployees', 3)).toEqual(null);
        });
      });

      describe('with path: many matching items', () => {
        const expected = { name: 'Ed Dillinger', title: 'Technical Lead' };

        it('should return the value', () => {
          expect(dig(obj, 1, 'employees', 1)).toEqual(expected);
        });
      });
    });

    describe('with an empty object', () => {
      const obj = {};

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 'salary')).toEqual(null);
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 'formerEmployees', 3, 'salary')).toEqual(null);
        });
      });
    });

    describe('with an object with flat data', () => {
      const obj = { name: 'Ed Dillinger', title: 'Technical Lead' };

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 'salary')).toEqual(null);
        });
      });

      describe('with path: one matching item', () => {
        it('should return the value', () => {
          expect(dig(obj, 'name')).toEqual('Ed Dillinger');
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 'formerEmployees', 3, 'salary')).toEqual(null);
        });
      });

      describe('with path: mixed matching and non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 'name', 3, 'salary')).toEqual(null);
        });
      });
    });

    describe('with an object with nested data', () => {
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

      describe('with an empty path', () => {
        it('should return the array', () => {
          expect(dig(obj)).toEqual(obj);
        });
      });

      describe('with path: one non-matching item', () => {
        it('should return null', () => {
          expect(dig(obj, 'salary')).toEqual(null);
        });
      });

      describe('with path: one matching item', () => {
        const expected = obj.teams;

        it('should return the value', () => {
          expect(dig(obj, 'teams')).toEqual(expected);
        });
      });

      describe('with path: many non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 'formerEmployees', 3, 'salary')).toEqual(null);
        });
      });

      describe('with path: mixed matching and non-matching items', () => {
        it('should return null', () => {
          expect(dig(obj, 'teams', 3, 'formerEmployees')).toEqual(null);
        });
      });

      describe('with path: many matching items', () => {
        const expected = { name: 'Ed Dillinger', title: 'Technical Lead' };

        it('should return the value', () => {
          expect(dig(obj, 'teams', 1, 'employees', 1)).toEqual(expected);
        });
      });
    });
  });

  describe('exists', () => {
    it('should be a function', () => {
      expect(typeof exists).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return false', () => {
        expect(exists(undefined)).toEqual(false);
      });
    });

    describe('with null', () => {
      it('should return false', () => {
        expect(exists(null)).toEqual(false);
      });
    });

    describe('with false', () => {
      it('should return true', () => {
        expect(exists(false)).toEqual(true);
      });
    });

    describe('with true', () => {
      it('should return true', () => {
        expect(exists(true)).toEqual(true);
      });
    });

    describe('with a number', () => {
      it('should return true', () => {
        expect(exists(0)).toEqual(true);
      });
    });

    describe('with an empty string', () => {
      it('should return true', () => {
        expect(exists('')).toEqual(true);
      });
    });

    describe('with a non-empty string', () => {
      it('should return true', () => {
        expect(exists('Greetings, programs!')).toEqual(true);
      });
    });

    describe('with an empty array', () => {
      it('should return true', () => {
        expect(exists([])).toEqual(true);
      });
    });

    describe('with a non-empty array', () => {
      it('should return true', () => {
        expect(exists([1, 2, 3])).toEqual(true);
      });
    });

    describe('with an empty object', () => {
      it('should return true', () => {
        expect(exists({})).toEqual(true);
      });
    });

    describe('with a non-empty object', () => {
      it('should return true', () => {
        expect(exists({ a: 1, b: 2, c: 3 })).toEqual(true);
      });
    });

    describe('with a function', () => {
      it('should return true', () => {
        expect(exists(() => {})).toEqual(true);
      });
    });
  });

  describe('isEmpty', () => {
    it('should be a function', () => {
      expect(typeof isEmpty).toEqual('function');
    });

    describe('with undefined', () => {
      it('should be false', () => {
        expect(isEmpty(undefined)).toEqual(false);
      });
    });

    describe('with null', () => {
      it('should be false', () => {
        expect(isEmpty(null)).toEqual(false);
      });
    });

    describe('with an empty array', () => {
      it('should be true', () => {
        expect(isEmpty([])).toEqual(true);
      });
    });

    describe('with an array with items', () => {
      it('should be true', () => {
        expect(isEmpty([1, 2, 3])).toEqual(false);
      });
    });

    describe('with an empty object', () => {
      it('should be true', () => {
        expect(isEmpty({})).toEqual(true);
      });
    });

    describe('with an object with properties', () => {
      it('should be false', () => {
        expect(isEmpty({ key: 'value' })).toEqual(false);
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
