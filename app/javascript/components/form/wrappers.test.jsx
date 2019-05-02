import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from '../button';
import FormInput from './input';

import {
  formField,
  formGroup,
  formInput,
  formSubmit,
} from './wrappers';

describe('Form component wrappers', () => {
  const propName = 'propertyName';
  const value = 'Property Value';
  const namespace = 'namespace';
  const data = { propertyName: value };
  const onChangeAction = jest.fn(obj => ({ payload: obj }));
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const form = {
    data,
    namespace,
    onChangeAction,
    onSubmitAction,
  };

  describe('formField()', () => {
    const id = 'namespace-property-name-input';

    it('should be a function', () => {
      expect(typeof formField).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formField(FormInput, propName);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should wrap the component in a FormField', () => {
      const Wrapped = formField(FormInput, propName);
      const rendered = shallow(<Wrapped form={form} />);

      expect(rendered).toHaveDisplayName('FormField');
      expect(rendered).toHaveProp('namespace', namespace);
      expect(rendered).toHaveProp('prop', propName);
    });

    it('should render the input', () => {
      const Wrapped = formField(FormInput, propName);
      const rendered = mount(<Wrapped form={form} />);
      const input = rendered.find('FormInput');

      expect(rendered).toContainMatchingElement('FormInput');
      expect(input).toExist();
      expect(input).toHaveProp('id', id);
      expect(input).toHaveProp('value', value);
    });

    it('should match the snapshot', () => {
      const Wrapped = formField(FormInput, propName);
      const rendered = mount(<Wrapped form={form} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with custom properties', () => {
      const props = { colWidth: '12', placeholder: 'Placeholder Text' };

      it('should wrap the component in a FormField', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} {...props} />);
        const { colWidth } = props;

        expect(rendered).toHaveDisplayName('FormField');
        expect(rendered).toHaveProp('colWidth', colWidth);
        expect(rendered).toHaveProp('namespace', namespace);
        expect(rendered).toHaveProp('prop', propName);
      });

      it('should render the input', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = mount(<Wrapped form={form} {...props} />);
        const input = rendered.find('FormInput');
        const { placeholder } = props;

        expect(rendered).toContainMatchingElement('FormInput');
        expect(input).toExist();
        expect(input).toHaveProp('id', id);
        expect(input).toHaveProp('placeholder', placeholder);
        expect(input).toHaveProp('value', value);
      });

      it('should match the snapshot', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = mount(<Wrapped form={form} {...props} />);

        expect(rendered).toMatchSnapshot();
      });
    });
  });

  describe('formGroup()', () => {
    const MockInput = () => (<span />);

    it('should be a function', () => {
      expect(typeof formGroup).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formGroup(MockInput);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should render the wrapped component', () => {
      const Wrapped = formGroup(MockInput);
      const rendered = shallow(<Wrapped form={form} />);
      const input = rendered.find('MockInput');

      expect(input).toExist();
      expect(input).toHaveProp({ form });
    });

    it('should match the snapshot', () => {
      const Wrapped = formGroup(MockInput);
      const rendered = shallow(<Wrapped form={form} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with custom properties', () => {
      const props = { buttonStyle: 'dark' };

      it('should render the wrapped component', () => {
        const Wrapped = formGroup(MockInput);
        const rendered = shallow(<Wrapped form={form} {...props} />);
        const input = rendered.find('MockInput');
        const { buttonStyle } = props;

        expect(input).toExist();
        expect(input).toHaveProp({ buttonStyle });
        expect(input).toHaveProp({ form });
      });
    });
  });

  describe('formInput()', () => {
    const id = 'namespace-property-name-input';

    it('should be a function', () => {
      expect(typeof formInput).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formInput(FormInput, propName);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should render the input', () => {
      const Wrapped = formInput(FormInput, propName);
      const rendered = shallow(<Wrapped form={form} />);

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp('id', id);
      expect(rendered).toHaveProp('value', value);
    });

    it('should set the onChange event handler', () => {
      const Wrapped = formInput(FormInput, propName);
      const rendered = shallow(<Wrapped form={form} />);
      const input = rendered.find('FormInput');
      const { onChange } = input.props();
      const newValue = 'New Property Value';
      const event = { target: { type: 'text', value: newValue } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName, value: newValue });
      expect(action).toEqual({ payload: { propName, value: newValue } });
    });

    it('should match the snapshot', () => {
      const Wrapped = formInput(FormInput, propName);
      const rendered = shallow(<Wrapped form={form} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with custom properties', () => {
      const props = { placeholder: 'Placeholder Text' };

      it('should render the input', () => {
        const Wrapped = formInput(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} {...props} />);
        const { placeholder } = props;

        expect(rendered).toHaveDisplayName('FormInput');
        expect(rendered).toHaveProp('id', id);
        expect(rendered).toHaveProp('placeholder', placeholder);
        expect(rendered).toHaveProp('value', value);
      });

      it('should match the snapshot', () => {
        const Wrapped = formInput(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} />);

        expect(rendered).toMatchSnapshot();
      });
    });
  });

  describe('formSubmit()', () => {
    const children = 'Button Text';
    const defaultProps = { children };

    it('should be a function', () => {
      expect(typeof formSubmit).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formSubmit(Button);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should render the button', () => {
      const Wrapped = formSubmit(Button);
      const rendered = shallow(<Wrapped form={form} {...defaultProps} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children });
    });

    it('should set the onClick event handler', () => {
      const Wrapped = formSubmit(Button);
      const rendered = shallow(<Wrapped form={form} {...defaultProps} />);
      const { onClick } = rendered.props();
      const preventDefault = jest.fn();
      const event = { preventDefault };

      expect(typeof onClick).toEqual('function');

      const action = onClick(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(onSubmitAction).toHaveBeenCalledWith();
      expect(action).toEqual({ payload: { ok: true } });
    });

    it('should match the snapshot', () => {
      const Wrapped = formSubmit(Button);
      const rendered = shallow(<Wrapped form={form} {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with custom properties', () => {
      const props = { ...defaultProps, buttonStyle: 'dark' };

      it('should render the button', () => {
        const Wrapped = formSubmit(Button);
        const rendered = shallow(<Wrapped form={form} {...props} />);
        const { buttonStyle } = props;

        expect(rendered).toHaveDisplayName('Button');
        expect(rendered).toHaveProp({ buttonStyle });
        expect(rendered).toHaveProp({ children });
      });

      it('should match the snapshot', () => {
        const Wrapped = formSubmit(Button);
        const rendered = shallow(<Wrapped form={form} {...props} />);

        expect(rendered).toMatchSnapshot();
      });
    });
  });
});
