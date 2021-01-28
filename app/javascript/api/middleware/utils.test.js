import {
  applyMiddleware,
  injectMiddleware,
  selectMiddleware,
  wrapMiddleware,
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

  describe('injectMiddleware()', () => {
    it('should be a function', () => {
      expect(typeof injectMiddleware).toEqual('function');
    });

    describe('with an empty middleware array', () => {
      const middleware = [];

      describe('with an empty directives array', () => {
        const directives = [];

        it('should return an empty array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual([]);
        });
      });

      describe('with after: :all', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            after: ':all',
          },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual([injected]);
        });
      });

      describe('with after: an undefined type', () => {
        const directives = [
          {
            middleware: {},
            after: 'invalid',
          },
        ];
        const error = new Error('Unable to inject middleware after "invalid"');

        it('should throw an error', () => {
          expect(() => (
            injectMiddleware(middleware, directives)
          )).toThrowError(error);
        });
      });

      describe('with before: :all', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            before: ':all',
          },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual([injected]);
        });
      });

      describe('with before: an undefined type', () => {
        const directives = [
          {
            middleware: {},
            before: 'invalid',
          },
        ];
        const error = new Error('Unable to inject middleware before "invalid"');

        it('should throw an error', () => {
          expect(() => (
            injectMiddleware(middleware, directives)
          )).toThrowError(error);
        });
      });
    });

    describe('with a non-empty middleware array', () => {
      const middleware = [
        { type: 'test/first' },
        { type: 'test/second' },
        { type: 'test/third' },
      ];

      describe('with an empty directives array', () => {
        const directives = [];

        it('should return an empty array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(middleware);
        });
      });

      describe('with after: :all', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            after: ':all',
          },
        ];
        const expected = [...middleware, injected];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with after: the first item', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            after: 'test/first',
          },
        ];
        const expected = [
          { type: 'test/first' },
          injected,
          { type: 'test/second' },
          { type: 'test/third' },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with after: an item in the middle of the array', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            after: 'test/second',
          },
        ];
        const expected = [
          { type: 'test/first' },
          { type: 'test/second' },
          injected,
          { type: 'test/third' },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with after: the last item', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            after: 'test/third',
          },
        ];
        const expected = [
          { type: 'test/first' },
          { type: 'test/second' },
          { type: 'test/third' },
          injected,
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with after: an undefined type', () => {
        const directives = [
          {
            middleware: {},
            after: 'invalid',
          },
        ];
        const error = new Error('Unable to inject middleware after "invalid"');

        it('should throw an error', () => {
          expect(() => (
            injectMiddleware(middleware, directives)
          )).toThrowError(error);
        });
      });

      describe('with before: :all', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            before: ':all',
          },
        ];
        const expected = [injected, ...middleware];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with before: the first item', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            before: 'test/first',
          },
        ];
        const expected = [
          injected,
          { type: 'test/first' },
          { type: 'test/second' },
          { type: 'test/third' },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with before: an item in the middle of the array', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            before: 'test/second',
          },
        ];
        const expected = [
          { type: 'test/first' },
          injected,
          { type: 'test/second' },
          { type: 'test/third' },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with before: the last item', () => {
        const injected = { type: 'test/middleware' };
        const directives = [
          {
            middleware: injected,
            before: 'test/third',
          },
        ];
        const expected = [
          { type: 'test/first' },
          { type: 'test/second' },
          injected,
          { type: 'test/third' },
        ];

        it('should inject the middleware to the array', () => {
          expect(injectMiddleware(middleware, directives)).toEqual(expected);
        });
      });

      describe('with before: an undefined type', () => {
        const directives = [
          {
            middleware: {},
            before: 'invalid',
          },
        ];
        const error = new Error('Unable to inject middleware before "invalid"');

        it('should throw an error', () => {
          expect(() => (
            injectMiddleware(middleware, directives)
          )).toThrowError(error);
        });
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

  describe('wrapMiddleware', () => {
    const next = jest.fn();

    beforeEach(() => { next.mockClear(); });

    it('should be a function', () => {
      expect(typeof wrapMiddleware).toEqual('function');
    });

    describe('with middleware: null', () => {
      it('should return the next function', () => {
        expect(wrapMiddleware(null, next)).toEqual(next);
      });
    });

    describe('with middleware: a function', () => {
      const inner = () => {};
      const middleware = jest.fn(() => inner);

      beforeEach(() => { middleware.mockClear(); });

      it('should call the middleware', () => {
        wrapMiddleware(middleware, next);

        expect(middleware).toHaveBeenCalledWith(next);
      });

      it('should return the inner function', () => {
        expect(wrapMiddleware(middleware, next)).toEqual(inner);
      });
    });
  });
});
