import React from 'react';
import { shallow } from 'enzyme';

import FormNumericInput from './index';

describe('<FormNumericInput />', () => {
  const onChange = jest.fn();
  const defaultProps = {
    id: 'property-name',
    value: '',
    onChange,
  };

  it('should create the input', () => {
    const rendered = shallow(<FormNumericInput {...defaultProps} />);
    const { id, value } = defaultProps;

    expect(rendered).toHaveDisplayName('FormInput');
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp('type', 'number');
    expect(rendered).toHaveProp({ value });
  });

  describe('onChange()', () => {
    describe('with a number', () => {
      it('should call onChange with the input value', () => {
        const rendered = shallow(<FormNumericInput {...defaultProps} />);
        const wrapped = rendered.props().onChange;
        const value = 3;
        const event = { target: { value } };

        wrapped(event);

        expect(onChange).toHaveBeenCalledWith({ target: { value } });
      });
    });

    describe('with an empty string', () => {
      it('should call onChange with the input value', () => {
        const rendered = shallow(<FormNumericInput {...defaultProps} />);
        const wrapped = rendered.props().onChange;
        const value = '';
        const event = { target: { value } };

        wrapped(event);

        expect(onChange).toHaveBeenCalledWith({ target: { value } });
      });
    });

    describe('with a string', () => {
      it('should call onChange with an empty string', () => {
        const rendered = shallow(<FormNumericInput {...defaultProps} />);
        const wrapped = rendered.props().onChange;
        const value = 'Invalid Value';
        const event = { target: { value } };

        wrapped(event);

        expect(onChange).toHaveBeenCalledWith({ target: { value: '' } });
      });
    });
  });

  describe('with value: number', () => {
    const props = { ...defaultProps, value: 3 };

    it('should create the input', () => {
      const rendered = shallow(<FormNumericInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('type', 'number');
      expect(rendered).toHaveProp('value', value.toString());
    });
  });

  describe('with value: string', () => {
    const props = { ...defaultProps, value: 'Invalid Value' };

    it('should create the input', () => {
      const rendered = shallow(<FormNumericInput {...props} />);
      const { id } = props;

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('type', 'number');
      expect(rendered).toHaveProp('value', '');
    });
  });

  describe('with input properties', () => {
    const props = { ...defaultProps, type: 'text', validStatus: 'invalid' };

    it('should create the input', () => {
      const rendered = shallow(<FormNumericInput {...props} />);
      const {
        id,
        type,
        validStatus,
        value,
      } = props;

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ type });
      expect(rendered).toHaveProp({ validStatus });
      expect(rendered).toHaveProp({ value });
    });
  });
});
