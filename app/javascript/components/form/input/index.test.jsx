import React from 'react';
import { shallow } from 'enzyme';

import FormInput from './index';

describe('<FormInput />', () => {
  const onChange = () => {};
  const defaultProps = {
    id: 'property-name',
    value: 'Property Value',
    onChange,
  };

  it('should create the input', () => {
    const rendered = shallow(<FormInput {...defaultProps} />);
    const { id, value } = defaultProps;

    expect(rendered).toHaveDisplayName('input');
    expect(rendered).toHaveClassName('form-control');
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp('type', 'text');
    expect(rendered).toHaveProp({ value });
    expect(rendered).toHaveProp({ onChange });
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'example-class' };

    it('should create the input', () => {
      const rendered = shallow(<FormInput {...props} />);
      const {
        className,
        id,
        value,
      } = props;

      expect(rendered).toHaveDisplayName('input');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName(className);
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('type', 'text');
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });

    describe('with validStatus: value', () => {
      it('should create the input', () => {
        const rendered = shallow(<FormInput {...props} validStatus="invalid" />);
        const { className, id, value } = props;

        expect(rendered).toHaveDisplayName('input');
        expect(rendered).toHaveClassName('form-control');
        expect(rendered).toHaveClassName(className);
        expect(rendered).toHaveClassName('is-invalid');
        expect(rendered).toHaveProp({ id });
        expect(rendered).toHaveProp('type', 'text');
        expect(rendered).toHaveProp({ value });
        expect(rendered).toHaveProp({ onChange });
      });
    });
  });

  describe('with placeholder: value', () => {
    const placeholder = 'Placeholder Text';
    const props = { ...defaultProps, placeholder };

    it('should create the input', () => {
      const rendered = shallow(<FormInput {...props} />);
      const {
        id,
        value,
      } = props;

      expect(rendered).toHaveDisplayName('input');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ placeholder });
      expect(rendered).toHaveProp('type', 'text');
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with type: value', () => {
    const props = { ...defaultProps, type: 'password' };

    it('should create the input', () => {
      const rendered = shallow(<FormInput {...props} />);
      const {
        id,
        type,
        value,
      } = props;

      expect(rendered).toHaveDisplayName('input');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ type });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with validStatus: invalid', () => {
    const props = { ...defaultProps, validStatus: 'invalid' };

    it('should create the input', () => {
      const rendered = shallow(<FormInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('input');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName('is-invalid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('type', 'text');
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with validStatus: valid', () => {
    const props = { ...defaultProps, validStatus: 'valid' };

    it('should create the input', () => {
      const rendered = shallow(<FormInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('input');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName('is-valid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('type', 'text');
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });
});
