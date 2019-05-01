import React from 'react';
import { shallow } from 'enzyme';

import FormRow from './index';

describe('<FormRow />', () => {
  const children = (<input type="text" />);
  const defaultProps = { children };

  it('should render the form row', () => {
    const rendered = shallow(<FormRow {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('form-row');
    expect(rendered).toHaveClassName('align-items-center');
    expect(rendered).toHaveClassName('justify-content-start');
    expect(rendered).toHaveProp('children', children);
  });

  describe('with align: center', () => {
    const props = { ...defaultProps, align: 'center' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-center');
      expect(rendered).toHaveClassName('justify-content-center');
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with align: left', () => {
    const props = { ...defaultProps, align: 'left' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-center');
      expect(rendered).toHaveClassName('justify-content-start');
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with align: right', () => {
    const props = { ...defaultProps, align: 'right' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-center');
      expect(rendered).toHaveClassName('justify-content-end');
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'other-class-name' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);
      const { className } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-center');
      expect(rendered).toHaveClassName('justify-content-start');
      expect(rendered).toHaveClassName(className);
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with verticalAlign: bottom', () => {
    const props = { ...defaultProps, verticalAlign: 'bottom' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-bottom');
      expect(rendered).toHaveClassName('justify-content-start');
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with verticalAlign: center', () => {
    const props = { ...defaultProps, verticalAlign: 'center' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-center');
      expect(rendered).toHaveClassName('justify-content-start');
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with verticalAlign: top', () => {
    const props = { ...defaultProps, verticalAlign: 'top' };

    it('should render the form row', () => {
      const rendered = shallow(<FormRow {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-row');
      expect(rendered).toHaveClassName('align-items-top');
      expect(rendered).toHaveClassName('justify-content-start');
      expect(rendered).toHaveProp('children', children);
    });
  });
});
