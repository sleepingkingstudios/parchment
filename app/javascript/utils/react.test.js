import {
  addClassName,
  addClassNameToProps,
} from './react';

describe('React utils', () => {
  describe('addClassName()', () => {
    it('should be a function', () => {
      expect(typeof addClassName).toEqual('function');
    });

    describe('with no arguments', () => {
      it('should return an empty string', () => {
        expect(addClassName()).toEqual('');
      });
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(addClassName(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(addClassName(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(addClassName('')).toEqual('');
      });
    });

    describe('with a string', () => {
      it('should return an empty string', () => {
        expect(addClassName('example-class')).toEqual('example-class');
      });
    });

    describe('with two undefined arguments', () => {
      it('should return an empty string', () => {
        expect(addClassName(undefined, undefined)).toEqual('');
      });
    });

    describe('with two null arguments', () => {
      it('should return an empty string', () => {
        expect(addClassName(null, null)).toEqual('');
      });
    });

    describe('with two empty strings', () => {
      it('should return an empty string', () => {
        expect(addClassName('', '')).toEqual('');
      });
    });

    describe('with a string and an undefined argument', () => {
      it('should return the string', () => {
        expect(addClassName('example-class', undefined)).toEqual('example-class');
      });
    });

    describe('with a string and null', () => {
      it('should return the string', () => {
        expect(addClassName('example-class', null)).toEqual('example-class');
      });
    });

    describe('with a string and an empty string', () => {
      it('should return the string', () => {
        expect(addClassName('example-class', '')).toEqual('example-class');
      });
    });

    describe('with an undefined argument and a string', () => {
      it('should return the string', () => {
        expect(addClassName(undefined, 'example-class')).toEqual('example-class');
      });
    });

    describe('with null and a string', () => {
      it('should return the string', () => {
        expect(addClassName(null, 'example-class')).toEqual('example-class');
      });
    });

    describe('with an empty string and a string', () => {
      it('should return the string', () => {
        expect(addClassName('', 'example-class')).toEqual('example-class');
      });
    });

    describe('with two string arguments', () => {
      it('should return the string', () => {
        const expected = 'example-class other-class';

        expect(addClassName('example-class', 'other-class')).toEqual(expected);
      });
    });

    describe('with multiple mixed arguments', () => {
      it('should return the string', () => {
        const expected = 'example-class other-class';

        expect(
          addClassName('example-class', undefined, 'other-class', null),
        ).toEqual(expected);
      });
    });

    describe('with multiple string arguments', () => {
      it('should return the string', () => {
        const expected = 'example-class other-class third-class';

        expect(
          addClassName('example-class', 'other-class', 'third-class'),
        ).toEqual(expected);
      });
    });
  });

  describe('addClassNameToProps()', () => {
    const defaultProps = { key: 'value' };
    const props = { ...defaultProps, className: 'example-class' };

    it('should be a function', () => {
      expect(typeof addClassNameToProps).toEqual('function');
    });

    describe('with an empty props object and no arguments', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps({})).toEqual({});
      });
    });

    describe('with a props object and no arguments', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps(defaultProps)).toEqual(defaultProps);
      });
    });

    describe('with a props object with className and no arguments', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps(props)).toEqual(props);
      });
    });

    describe('with a props object and undefined', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps(props, undefined)).toEqual(props);
      });
    });

    describe('with a props object and null', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps(props, null)).toEqual(props);
      });
    });

    describe('with a props object and an empty string', () => {
      it('should return the props object', () => {
        expect(addClassNameToProps(props, '')).toEqual(props);
      });
    });

    describe('with a props object and a string', () => {
      const className = `${props.className} other-class`;
      const expected = Object.assign({}, props, { className });

      it('should merge the string with the props className', () => {
        expect(addClassNameToProps(props, 'other-class')).toEqual(expected);
      });
    });

    describe('with a props object and mixed arguments', () => {
      const className = `${props.className} other-class`;
      const expected = Object.assign({}, props, { className });

      it('should merge the string with the props className', () => {
        expect(
          addClassNameToProps(props, undefined, 'other-class'),
        ).toEqual(expected);
      });
    });

    describe('with a props object and mixed arguments', () => {
      const className = `${props.className} other-class`;
      const expected = Object.assign({}, props, { className });

      it('should merge the string with the props className', () => {
        expect(
          addClassNameToProps(props, undefined, 'other-class'),
        ).toEqual(expected);
      });
    });

    describe('with a props object and multiple string arguments', () => {
      const className = `${props.className} other-class third-class`;
      const expected = Object.assign({}, props, { className });

      it('should merge the string with the props className', () => {
        expect(
          addClassNameToProps(props, 'other-class', 'third-class'),
        ).toEqual(expected);
      });
    });
  });
});
