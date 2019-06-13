import {
  humanizeList,
  indexOfMatching,
} from './array';

describe('Array utils', () => {
  describe('humanizeList', () => {
    it('should be a function', () => {
      expect(typeof humanizeList).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(humanizeList(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(humanizeList(null)).toEqual('');
      });
    });

    describe('with a String', () => {
      it('should return the string', () => {
        expect(humanizeList('String')).toEqual('String');
      });
    });

    describe('with an Object', () => {
      it('should convert the object to a string', () => {
        const object = { key: 'value' };

        expect(humanizeList(object)).toEqual(object.toString());
      });
    });

    describe('with an empty Array', () => {
      it('should return an empty string', () => {
        expect(humanizeList([])).toEqual('');
      });

      describe('with default: value', () => {
        const opts = { default: 'Nothing' };

        it('should return the default value', () => {
          expect(humanizeList([], opts)).toEqual(opts.default);
        });
      });
    });

    describe('with an Array with one item', () => {
      const ary = ['foo'];

      it('should return the item', () => {
        expect(humanizeList(ary)).toEqual(ary[0]);
      });
    });

    describe('with an Array with two items', () => {
      const ary = ['foo', 'bar'];

      it('should join the items', () => {
        const expected = 'foo and bar';

        expect(humanizeList(ary)).toEqual(expected);
      });

      describe('with conjunction: value', () => {
        const opts = { conjunction: 'or' };

        it('should join the items', () => {
          const expected = 'foo or bar';

          expect(humanizeList(ary, opts)).toEqual(expected);
        });
      });
    });

    describe('with an Array with three or more items', () => {
      const ary = ['foo', 'bar', 'baz'];

      it('should join the items', () => {
        const expected = 'foo, bar, and baz';

        expect(humanizeList(ary)).toEqual(expected);
      });

      describe('with conjunction: value', () => {
        const opts = { conjunction: 'or' };

        it('should join the items', () => {
          const expected = 'foo, bar, or baz';

          expect(humanizeList(ary, opts)).toEqual(expected);
        });
      });
    });
  });

  describe('indexOfMatching', () => {
    it('should be a function', () => {
      expect(typeof indexOfMatching).toEqual('function');
    });

    describe('with undefined', () => {
      it('should throw an error', () => {
        expect(() => indexOfMatching(undefined, () => {})).toThrow(TypeError);
      });
    });

    describe('with null', () => {
      it('should throw an error', () => {
        expect(() => indexOfMatching(null, () => {})).toThrow(TypeError);
      });
    });

    describe('with a String', () => {
      it('should return -1', () => {
        expect(indexOfMatching('', () => {})).toEqual(-1);
      });
    });

    describe('with an Object', () => {
      it('should return -1', () => {
        expect(indexOfMatching('', () => {})).toEqual(-1);
      });
    });

    describe('with an empty Array', () => {
      it('should return -1', () => {
        expect(indexOfMatching('', () => {})).toEqual(-1);
      });
    });

    describe('with an Array with a non-matching function', () => {
      const ary = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
      ];
      const fn = item => (item.id === -1);

      it('should return -1', () => {
        expect(indexOfMatching(ary, fn)).toEqual(-1);
      });
    });

    describe('with an Array with a matching function', () => {
      const ary = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
      ];
      const fn = item => (item.id === 1);

      it('should return -1', () => {
        expect(indexOfMatching(ary, fn)).toEqual(1);
      });
    });
  });
});
