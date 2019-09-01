import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

const buttonStyles = [
  'danger',
  'dark',
  'info',
  'light',
  'primary',
  'secondary',
  'success',
  'warning',
];

describe('<Button />', () => {
  const onClick = jest.fn();
  const defaultProps = {
    children: 'Button Label',
    onClick,
  };

  it('should create the button', () => {
    const rendered = shallow(<Button {...defaultProps} />);

    const { children } = defaultProps;

    expect(rendered).toHaveDisplayName('button');
    expect(rendered).toHaveClassName('btn');
    expect(rendered).toHaveClassName('btn-primary');
    expect(rendered).not.toHaveClassName('btn-block');
    expect(rendered).toHaveProp('children', children);
    expect(rendered).toHaveProp('disabled', false);
    expect(rendered).toHaveProp('onClick', onClick);
  });

  it('should match the snaphot', () => {
    const rendered = shallow(<Button {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with block: true', () => {
    const props = { ...defaultProps, block: true };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-block');
    });
  });

  describe('with buttonSize: large', () => {
    const props = { ...defaultProps, buttonSize: 'large' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-lg');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonSize: lg', () => {
    const props = { ...defaultProps, buttonSize: 'lg' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-lg');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonSize: md', () => {
    const props = { ...defaultProps, buttonSize: 'md' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).not.toHaveClassName('btn-lg');
      expect(rendered).not.toHaveClassName('btn-sm');
    });
  });

  describe('with buttonSize: medium', () => {
    const props = { ...defaultProps, buttonSize: 'medium' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).not.toHaveClassName('btn-lg');
      expect(rendered).not.toHaveClassName('btn-sm');
    });
  });

  describe('with buttonSize: sm', () => {
    const props = { ...defaultProps, buttonSize: 'sm' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-sm');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonSize: small', () => {
    const props = { ...defaultProps, buttonSize: 'small' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-sm');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonSize: unknown value', () => {
    const props = { ...defaultProps, buttonSize: 'lilliputian' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).not.toHaveClassName('btn-lg');
      expect(rendered).not.toHaveClassName('btn-sm');
    });
  });

  buttonStyles.forEach((buttonStyle) => {
    describe(`with buttonStyle: ${buttonStyle}`, () => {
      const props = { ...defaultProps, buttonStyle };

      it('should create the button', () => {
        const rendered = shallow(<Button {...props} />);

        expect(rendered).toHaveClassName('btn');
        expect(rendered).toHaveClassName(`btn-${buttonStyle}`);
        expect(rendered).not.toHaveClassName('btn-block');
      });
    });
  });

  describe('with buttonStyle: unknown value', () => {
    const props = { ...defaultProps, buttonStyle: 'enigmatic' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with className: value', () => {
    const className = 'custom-btn';
    const props = { ...defaultProps, className };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName(className);
    });
  });

  describe('with disabled: true', () => {
    const props = { ...defaultProps, disabled: true };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveProp('disabled', true);
    });

    it('should stub out the onClick handler', () => {
      const rendered = shallow(<Button {...props} />);
      const handler = rendered.props().onClick;
      const preventDefault = jest.fn();
      const event = { preventDefault };

      expect(typeof handler).toEqual('function');

      handler(event);

      expect(onClick).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('with link: true', () => {
    const linkProps = { ...defaultProps, link: true };

    it('should create the button', () => {
      const rendered = shallow(<Button {...linkProps} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-link');
      expect(rendered).not.toHaveClassName('btn-block');
    });

    buttonStyles.forEach((buttonStyle) => {
      describe(`with buttonStyle: ${buttonStyle}`, () => {
        const props = { ...linkProps, buttonStyle };

        it('should create the button', () => {
          const rendered = shallow(<Button {...props} />);

          expect(rendered).toHaveClassName('btn');
          expect(rendered).toHaveClassName('btn-link');
          expect(rendered).toHaveClassName(`text-${buttonStyle}`);
          expect(rendered).not.toHaveClassName('btn-block');
        });
      });
    });

    describe('with buttonStyle: unknown value', () => {
      const props = { ...linkProps, buttonStyle: 'enigmatic' };

      it('should create the button', () => {
        const rendered = shallow(<Button {...props} />);

        expect(rendered).toHaveClassName('btn');
        expect(rendered).toHaveClassName('btn-link');
        expect(rendered).not.toHaveClassName('btn-block');
      });
    });
  });

  describe('with outline: true', () => {
    const outlineProps = { ...defaultProps, outline: true };

    it('should create the button', () => {
      const rendered = shallow(<Button {...outlineProps} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-primary');
      expect(rendered).not.toHaveClassName('btn-block');
    });

    buttonStyles.forEach((buttonStyle) => {
      describe(`with buttonStyle: ${buttonStyle}`, () => {
        const props = { ...outlineProps, buttonStyle };

        it('should create the button', () => {
          const rendered = shallow(<Button {...props} />);

          expect(rendered).toHaveClassName('btn');
          expect(rendered).toHaveClassName(`btn-outline-${buttonStyle}`);
          expect(rendered).not.toHaveClassName('btn-block');
        });
      });
    });

    describe('with buttonStyle: unknown value', () => {
      const props = { ...outlineProps, buttonStyle: 'enigmatic' };

      it('should create the button', () => {
        const rendered = shallow(<Button {...props} />);

        expect(rendered).toHaveClassName('btn');
        expect(rendered).toHaveClassName('btn-outline-primary');
        expect(rendered).not.toHaveClassName('btn-block');
      });
    });

    describe('with disabled: true', () => {
      const props = { ...outlineProps, disabled: true };

      it('should create the button', () => {
        const rendered = shallow(<Button {...props} />);

        expect(rendered).toHaveClassName('btn');
        expect(rendered).toHaveProp('disabled', true);
      });

      it('should stub out the onClick handler', () => {
        const rendered = shallow(<Button {...props} />);
        const handler = rendered.props().onClick;
        const preventDefault = jest.fn();
        const event = { preventDefault };

        expect(typeof handler).toEqual('function');

        handler(event);

        expect(onClick).not.toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalled();
      });
    });
  });
});
