import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './index';

describe('<Spinner />', () => {
  const defaultProps = {};

  it('should render an inline spinner', () => {
    const rendered = shallow(<Spinner {...defaultProps} />);

    expect(rendered).toHaveDisplayName('span');
    expect(rendered).toHaveClassName('spinner-border');
    expect(rendered).toHaveProp('role', 'status');
    expect(rendered).toHaveProp('aria-hidden', 'true');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Spinner {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'text-danger' };

    it('should render an inline spinner', () => {
      const rendered = shallow(<Spinner {...props} />);
      const { className } = props;

      expect(rendered).toHaveDisplayName('span');
      expect(rendered).toHaveClassName('spinner-border');
      expect(rendered).toHaveClassName(className);
    });
  });

  describe('with size: lg', () => {
    const props = { ...defaultProps, size: 'lg' };

    it('should render an inline spinner', () => {
      const rendered = shallow(<Spinner {...props} />);

      expect(rendered).toHaveDisplayName('span');
      expect(rendered).toHaveClassName('spinner-border');
      expect(rendered).toHaveClassName('spinner-border-lg');
    });
  });

  describe('with size: sm', () => {
    const props = { ...defaultProps, size: 'sm' };

    it('should render an inline spinner', () => {
      const rendered = shallow(<Spinner {...props} />);

      expect(rendered).toHaveDisplayName('span');
      expect(rendered).toHaveClassName('spinner-border');
      expect(rendered).toHaveClassName('spinner-border-sm');
    });
  });

  describe('with spinnerStyle: grow', () => {
    const props = { ...defaultProps, spinnerStyle: 'grow' };

    it('should render an inline spinner', () => {
      const rendered = shallow(<Spinner {...props} />);

      expect(rendered).toHaveDisplayName('span');
      expect(rendered).toHaveClassName('spinner-grow');
    });

    describe('with size: lg', () => {
      const propsWithSize = { ...props, size: 'lg' };

      it('should render an inline spinner', () => {
        const rendered = shallow(<Spinner {...propsWithSize} />);

        expect(rendered).toHaveDisplayName('span');
        expect(rendered).toHaveClassName('spinner-grow');
        expect(rendered).toHaveClassName('spinner-grow-lg');
      });
    });

    describe('with size: sm', () => {
      const propsWithSize = { ...props, size: 'sm' };

      it('should render an inline spinner', () => {
        const rendered = shallow(<Spinner {...propsWithSize} />);

        expect(rendered).toHaveDisplayName('span');
        expect(rendered).toHaveClassName('spinner-grow');
        expect(rendered).toHaveClassName('spinner-grow-sm');
      });
    });
  });
});
