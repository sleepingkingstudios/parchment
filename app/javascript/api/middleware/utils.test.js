import {
  applyMiddleware,
  selectMiddleware,
} from './utils';

describe('Request middleware utils', () => {
  describe('applyMiddleware()', () => {
    const append = (ary, obj) => {
      const copy = ary.slice();

      copy.push(obj);

      return copy;
    };
    const beforeAndAfter = str => next => (ary) => {
      const before = append(ary, `before ${str}`);
      const during = next(before);
      const after = append(during, `after ${str}`);

      return after;
    };

    it('should be a function', () => {
      expect(typeof applyMiddleware).toEqual('function');
    });

    describe('with an empty middleware array', () => {
      const original = ary => append(ary, 'A');
      const middleware = [];
      const applied = applyMiddleware(original, middleware);

      it('should return a function', () => {
        expect(typeof applied).toEqual('function');
      });

      it('should call the original function', () => {
        expect(applied([])).toEqual(['A']);
      });
    });

    describe('with a middleware array with one item', () => {
      const original = ary => append(ary, 'B');
      const middleware = [
        beforeAndAfter('A'),
      ];
      const applied = applyMiddleware(original, middleware);

      it('should return a function', () => {
        expect(typeof applied).toEqual('function');
      });

      it('should call the middleware and the original function', () => {
        expect(applied([])).toEqual(['before A', 'B', 'after A']);
      });
    });

    describe('with a middleware array with many items', () => {
      const original = ary => append(ary, 'D');
      const middleware = [
        beforeAndAfter('A'),
        beforeAndAfter('B'),
        beforeAndAfter('C'),
      ];
      const applied = applyMiddleware(original, middleware);

      it('should return a function', () => {
        expect(typeof applied).toEqual('function');
      });

      it('should call the middleware and the original function', () => {
        const expected = [
          'before A',
          'before B',
          'before C',
          'D',
          'after C',
          'after B',
          'after A',
        ];

        expect(applied([])).toEqual(expected);
      });
    });
  });

  describe('selectMiddleware()', () => {
    it('should be a function', () => {
      expect(typeof selectMiddleware).toEqual('function');
    });

    describe('with no arguments', () => {
      it('should return an empty array', () => {
        expect(selectMiddleware()).toEqual([]);
      });
    });

    describe('with null', () => {
      it('should return an empty array', () => {
        expect(selectMiddleware(null)).toEqual([]);
      });
    });

    describe('with a function', () => {
      const fn = () => {};

      it('should wrap the function in an array', () => {
        expect(selectMiddleware(fn)).toEqual([fn]);
      });
    });

    describe('with an empty array', () => {
      it('should return an empty array', () => {
        expect(selectMiddleware([])).toEqual([]);
      });
    });

    describe('with an array with many functions', () => {
      const fn = () => {};

      it('should return an array containing the functions', () => {
        expect(selectMiddleware([fn, fn, fn])).toEqual([fn, fn, fn]);
      });
    });

    describe('with an array with mixed values', () => {
      const fn = () => {};

      it('should return an array containing the functions', () => {
        expect(selectMiddleware([fn, 'string', fn, { fn }])).toEqual([fn, fn]);
      });
    });

    describe('with an empty array and a prop name', () => {
      const prop = 'handleSomething';

      it('should return an empty array', () => {
        expect(selectMiddleware([], prop)).toEqual([]);
      });
    });

    describe('with an array of objects', () => {
      const prop = 'handleSomething';

      it('should return an empty array', () => {
        expect(selectMiddleware([{}, {}, {}], prop)).toEqual([]);
      });
    });

    describe('with an array of objects with the property with function values', () => {
      const handleSomething = () => {};
      const prop = 'handleSomething';
      const actual = [
        { handleSomething },
        { handleSomething },
        { handleSomething },
      ];
      const expected = [
        handleSomething,
        handleSomething,
        handleSomething,
      ];

      it('should return an array containing the functions', () => {
        expect(selectMiddleware(actual, prop)).toEqual(expected);
      });
    });

    describe('with an array of objects with the property with mixed values', () => {
      const handleSomething = () => {};
      const prop = 'handleSomething';
      const actual = [
        { handleSomething },
        { handleSomething: null },
        { handleSomething },
        { handleSomething: 'value' },
      ];
      const expected = [
        handleSomething,
        handleSomething,
      ];

      it('should return an array containing the functions', () => {
        expect(selectMiddleware(actual, prop)).toEqual(expected);
      });
    });
  });
});
