import React from 'react';
import { shallow } from 'enzyme';

import {
  addClassName,
  addClassNameToProps,
  injectProps,
  responsiveText,
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

  describe('injectProps()', () => {
    const CustomComponent = props => (<span className="custom-span" {...props} />);

    it('should be a function', () => {
      expect(typeof injectProps).toEqual('function');
    });

    describe('with a component', () => {
      it('should return the component', () => {
        expect(injectProps(CustomComponent)).toBe(CustomComponent);
      });
    });

    describe('with a component and an empty object', () => {
      it('should return a React component', () => {
        const WrappedComponent = injectProps(CustomComponent);

        expect(typeof WrappedComponent).toEqual('function');
      });

      it('should render the child component', () => {
        const WrappedComponent = injectProps(CustomComponent);
        const rendered = shallow(<WrappedComponent />);

        expect(rendered).toExist();
        expect(rendered).toHaveDisplayName('span');
        expect(rendered).toHaveClassName('custom-span');
      });

      describe('when rendered with props', () => {
        const props = {
          className: 'custom-class',
          customKey: 'custom value',
          otherKey: 'other value',
        };

        it('should render the child component', () => {
          const WrappedComponent = injectProps(CustomComponent);
          const rendered = shallow(<WrappedComponent {...props} />);

          expect(rendered).toExist();
          expect(rendered).toHaveDisplayName('span');
          expect(rendered).toHaveClassName('custom-class');
          expect(rendered).toHaveProp({ customKey: 'custom value' });
          expect(rendered).toHaveProp({ otherKey: 'other value' });
        });
      });
    });

    describe('with a component and a default properties object', () => {
      const defaultProps = {
        className: 'default-class',
        customKey: 'default value',
        defaultKey: 'default value',
      };

      it('should return a React component', () => {
        const WrappedComponent = injectProps(CustomComponent, defaultProps);

        expect(typeof WrappedComponent).toEqual('function');
      });

      it('should render the child component', () => {
        const WrappedComponent = injectProps(CustomComponent, defaultProps);
        const rendered = shallow(<WrappedComponent />);

        expect(rendered).toExist();
        expect(rendered).toHaveDisplayName('CustomComponent');
        expect(rendered).toHaveClassName('default-class');
        expect(rendered).toHaveProp({ customKey: 'default value' });
        expect(rendered).toHaveProp({ defaultKey: 'default value' });
      });

      describe('when rendered with props', () => {
        const props = {
          className: 'custom-class',
          customKey: 'custom value',
          otherKey: 'other value',
        };

        it('should render the child component', () => {
          const WrappedComponent = injectProps(CustomComponent, defaultProps);
          const rendered = shallow(<WrappedComponent {...props} />);

          expect(rendered).toExist();
          expect(rendered).toHaveDisplayName('CustomComponent');
          expect(rendered).toHaveClassName('custom-class');
          expect(rendered).toHaveClassName('default-class');
          expect(rendered).toHaveProp({ customKey: 'custom value' });
          expect(rendered).toHaveProp({ defaultKey: 'default value' });
          expect(rendered).toHaveProp({ otherKey: 'other value' });
        });
      });
    });
  });

  describe('responsiveText()', () => {
    it('should be a function', () => {
      expect(typeof responsiveText).toEqual('function');
    });

    describe('with an empty component', () => {
      const rendered = shallow(<span />);

      it('should return an empty string', () => {
        expect(responsiveText(rendered)).toEqual('');
      });
    });

    describe('with a component with text', () => {
      const rendered = shallow(<span>Greetings, programs!</span>);

      it('should return the component text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'xl')).toEqual('Greetings, programs!');
      });
    });

    describe('with a component with nested components', () => {
      const rendered = shallow(<span><span>Greetings</span>, <span>programs!</span></span>);

      it('should return the component text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'xl')).toEqual('Greetings, programs!');
      });
    });

    describe('with a component with display: none', () => {
      const rendered = shallow(<span className="d-none">Greetings, programs!</span>);

      it('should return an empty string', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('');
        expect(responsiveText(rendered, 'xl')).toEqual('');
      });
    });

    describe('with a component with display: inline', () => {
      const rendered = shallow(<span className="d-inline">Greetings, programs!</span>);

      it('should return an empty string', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'xl')).toEqual('Greetings, programs!');
      });
    });

    describe('with a component with a minimum size', () => {
      const rendered = shallow(<span className="d-none d-md-inline">Greetings, programs!</span>);

      it('should return the responsive text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('');
        expect(responsiveText(rendered, 'sm')).toEqual('');
        expect(responsiveText(rendered, 'md')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'lg')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'xl')).toEqual('Greetings, programs!');
      });
    });

    describe('with a component with a maximum size', () => {
      const rendered = shallow(<span className="d-inline d-md-none">Greetings, programs!</span>);

      it('should return the responsive text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'sm')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'md')).toEqual('');
        expect(responsiveText(rendered, 'lg')).toEqual('');
        expect(responsiveText(rendered, 'xl')).toEqual('');
      });
    });

    describe('with a component with a minimum and a maximum size', () => {
      const rendered = shallow(<span className="d-none d-sm-inline d-lg-none">Greetings, programs!</span>);

      it('should return the responsive text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('');
        expect(responsiveText(rendered, 'sm')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'md')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'lg')).toEqual('');
        expect(responsiveText(rendered, 'xl')).toEqual('');
      });
    });

    describe('with a component with alternate content', () => {
      const rendered = shallow(
        <span>
          Greetings
          <span className="d-none d-sm-inline d-lg-none">, programs!</span>
          <span className="d-none d-lg-inline">, starfighter!</span>
        </span>,
      );

      it('should return the responsive text', () => {
        expect(responsiveText(rendered, 'xs')).toEqual('Greetings');
        expect(responsiveText(rendered, 'sm')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'md')).toEqual('Greetings, programs!');
        expect(responsiveText(rendered, 'lg')).toEqual('Greetings, starfighter!');
        expect(responsiveText(rendered, 'xl')).toEqual('Greetings, starfighter!');
      });
    });
  });
});
