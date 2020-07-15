import React from 'react';
import { shallow, mount } from 'enzyme';

import FormInput from './input';
import {
  formField,
  formGroup,
  formInput,
} from './wrappers';
import { dig } from '../../utils/object';
import { slugify } from '../../utils/string';

describe('Form component wrappers', () => {
  describe('formField()', () => {
    const propName = 'propertyName';
    const value = 'Property Value';
    const id = 'property-name-input';
    const data = { propertyName: value };
    const defaultForm = {
      data,
      errors: {},
    };

    it('should be a function', () => {
      expect(typeof formField).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formField(FormInput, propName);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should set the display name', () => {
      const Wrapped = formField(FormInput, propName);

      expect(Wrapped.displayName).toEqual('PropertyNameField');
    });

    it('should set the input display name', () => {
      const Wrapped = formField(FormInput, propName);

      expect(Wrapped.inputDisplayName).toEqual('FormInput');
    });

    describe('with default properties', () => {
      const form = { ...defaultForm };

      it('should wrap the component in a FormField', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} />);

        expect(rendered).toHaveDisplayName('FormField');
        expect(rendered).toHaveProp('path', []);
        expect(rendered).toHaveProp('prop', propName);
        expect(rendered).toHaveClassName('property-name-field');
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
    });

    describe('with custom properties', () => {
      const form = { ...defaultForm };
      const props = { colWidth: '12', placeholder: 'Placeholder Text' };

      it('should wrap the component in a FormField', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} {...props} />);
        const { colWidth } = props;

        expect(rendered).toHaveDisplayName('FormField');
        expect(rendered).toHaveProp('colWidth', colWidth);
        expect(rendered).toHaveProp('prop', propName);
        expect(rendered).toHaveClassName('property-name-field');
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

    describe('with displayName: value', () => {
      const displayName = 'CustomField';

      it('should set the display name', () => {
        const Wrapped = formField(FormInput, propName, { displayName });

        expect(Wrapped.displayName).toEqual(displayName);
      });
    });

    describe('with errors: matching error', () => {
      const form = { ...defaultForm };
      const errors = { propertyName: ['has an error', 'has another error'] };
      const formWithErrors = { ...form, errors };

      it('should render the input', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = mount(<Wrapped form={formWithErrors} />);
        const input = rendered.find('FormInput');

        expect(rendered).toContainMatchingElement('FormInput');
        expect(input).toExist();
        expect(input).toHaveProp({ id });
        expect(input).toHaveProp({ value });
        expect(input).toHaveProp('validStatus', 'invalid');
      });

      it('should render the error feedback', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = mount(<Wrapped form={formWithErrors} />);
        const feedback = rendered.find('div.invalid-feedback');
        const expected = errors.propertyName.join(', ');

        expect(feedback).toExist();
        expect(feedback).toHaveText(expected);
      });
    });

    describe('with path: array', () => {
      const path = ['weapons', 'swords', 'japanese'];
      const form = { ...defaultForm, path };

      it('should wrap the component in a FormField', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} />);
        const className = 'weapons-swords-japanese-property-name-field';

        expect(rendered).toHaveDisplayName('FormField');
        expect(rendered).toHaveProp('path', path);
        expect(rendered).toHaveProp('prop', propName);
        expect(rendered).toHaveClassName(className);
      });
    });

    describe('with path: value', () => {
      const path = 'sword';
      const form = { ...defaultForm, path };

      it('should wrap the component in a FormField', () => {
        const Wrapped = formField(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} />);
        const className = 'sword-property-name-field';

        expect(rendered).toHaveDisplayName('FormField');
        expect(rendered).toHaveProp('path', [path]);
        expect(rendered).toHaveProp('prop', propName);
        expect(rendered).toHaveClassName(className);
      });
    });
  });

  describe('formGroup()', () => {
    const propName = 'propertyName';
    const value = 'Property Value';
    const data = { propertyName: value };
    const form = {
      data,
      errors: {},
    };

    const MockInput = () => (<span />);

    it('should be a function', () => {
      expect(typeof formGroup).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formGroup(MockInput);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should set the display name', () => {
      const Wrapped = formGroup(MockInput);

      expect(Wrapped.displayName).toEqual('FormGroupWrapper');
    });

    it('should set the input display name', () => {
      const Wrapped = formGroup(MockInput);

      expect(Wrapped.inputDisplayName).toEqual('MockInput');
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

    describe('with displayName: value', () => {
      const displayName = 'CustomGroup';

      it('should set the display name', () => {
        const Wrapped = formGroup(MockInput, { displayName });

        expect(Wrapped.displayName).toEqual(displayName);
      });
    });

    describe('with errors: matching error', () => {
      const errors = { propertyName: ['has an error', 'has another error'] };
      const formWithErrors = { ...form, errors };

      it('should render the wrapped component', () => {
        const Wrapped = formGroup(MockInput, { propName });
        const rendered = shallow(<Wrapped form={formWithErrors} />);
        const input = rendered.find('MockInput');

        expect(input).toExist();
        expect(input).toHaveProp('form', formWithErrors);
        expect(input).toHaveProp('validStatus', 'invalid');
      });

      it('should render the error feedback', () => {
        const Wrapped = formGroup(MockInput, { propName });
        const rendered = mount(<Wrapped form={formWithErrors} />);
        const feedback = rendered.find('div.invalid-feedback');
        const expected = errors.propertyName.join(', ');

        expect(feedback).toExist();
        expect(feedback).toHaveText(expected);
      });
    });
  });

  describe('formInput()', () => {
    const propName = 'propertyName';
    const value = 'Property Value';
    const data = { propertyName: value };
    const onChangeAction = jest.fn(obj => ({ payload: obj }));
    const defaultForm = {
      data,
      errors: {},
      onChangeAction,
    };

    it('should be a function', () => {
      expect(typeof formInput).toEqual('function');
    });

    it('should return a component', () => {
      const Wrapped = formInput(FormInput, propName);

      expect(typeof Wrapped).toEqual('function');
    });

    it('should set the display name', () => {
      const Wrapped = formInput(FormInput, propName);

      expect(Wrapped.displayName).toEqual('PropertyNameInput');
    });

    it('should set the input display name', () => {
      const Wrapped = formInput(FormInput, propName);

      expect(Wrapped.inputDisplayName).toEqual('FormInput');
    });

    describe('with default properties', () => {
      const form = { ...defaultForm };
      const id = 'property-name-input';

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
        const payload = { data: { propertyName: newValue }, path: [] };

        expect(onChangeAction).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });
      });

      it('should match the snapshot', () => {
        const Wrapped = formInput(FormInput, propName);
        const rendered = shallow(<Wrapped form={form} />);

        expect(rendered).toMatchSnapshot();
      });
    });

    describe('with custom properties', () => {
      const form = { ...defaultForm };
      const id = 'property-name-input';
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

    describe('with displayName: value', () => {
      const displayName = 'CustomInput';

      it('should set the display name', () => {
        const Wrapped = formInput(FormInput, propName, { displayName });

        expect(Wrapped.displayName).toEqual(displayName);
      });
    });

    describe('with mapDataToValue: function', () => {
      const form = { ...defaultForm };
      const id = 'property-name-input';
      const mapDataToValue = jest.fn((props) => {
        const { path, prop } = props;

        return dig(props.data, ...path, prop).toUpperCase();
      });

      it('should render the input', () => {
        const Wrapped = formInput(FormInput, propName, { mapDataToValue });
        const rendered = shallow(<Wrapped form={form} />);

        expect(rendered).toHaveDisplayName('FormInput');
        expect(rendered).toHaveProp('id', id);
        expect(rendered).toHaveProp('value', value.toUpperCase());

        expect(mapDataToValue).toHaveBeenCalledWith({ data, path: [], prop: propName });
      });
    });

    describe('with mapDataToPlaceholder: function', () => {
      const multiData = {
        ...data,
        otherPropertyName: 'Custom Value',
      };
      const form = {
        ...defaultForm,
        data: multiData,
      };
      const id = 'property-name-input';
      const mapDataToPlaceholder = jest.fn((props) => {
        const { path } = props;

        return slugify(dig(props.data, ...path, 'otherPropertyName'));
      });

      it('should render the input', () => {
        const Wrapped = formInput(FormInput, propName, { mapDataToPlaceholder });
        const rendered = shallow(<Wrapped form={form} />);

        expect(rendered).toHaveDisplayName('FormInput');
        expect(rendered).toHaveProp('id', id);
        expect(rendered).toHaveProp('placeholder', 'custom-value');
        expect(rendered).toHaveProp('value', value);

        expect(mapDataToPlaceholder).toHaveBeenCalledWith({
          data: multiData,
          path: [],
          prop: propName,
        });
      });
    });

    describe('with mapValueToData: function', () => {
      const form = { ...defaultForm };
      const mapValueToData = jest.fn(props => props);

      it('should set the onChange event handler', () => {
        const Wrapped = formInput(FormInput, propName, { mapValueToData });
        const rendered = shallow(<Wrapped form={form} />);
        const input = rendered.find('FormInput');
        const { onChange } = input.props();
        const newValue = 'New Property Value';
        const event = { target: { type: 'text', value: newValue } };

        expect(typeof onChange).toEqual('function');

        const action = onChange(event);
        const payload = { data: { prop: propName, value: newValue }, path: [] };

        expect(onChangeAction).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });

        expect(mapValueToData).toHaveBeenCalledWith({ prop: propName, value: newValue });
      });
    });

    describe('with path: array', () => {
      const nestedData = {
        weapons: {
          swords: {
            japanese: data,
          },
        },
      };
      const path = ['weapons', 'swords', 'japanese'];
      const form = { ...defaultForm, data: nestedData, path };
      const id = 'weapons-swords-japanese-property-name-input';

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
        const payload = { data: { propertyName: newValue }, path };

        expect(onChangeAction).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });
      });
    });

    describe('with path: value', () => {
      const nestedData = { sword: data };
      const path = 'sword';
      const form = { ...defaultForm, data: nestedData, path };
      const id = 'sword-property-name-input';

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
        const payload = { data: { propertyName: newValue }, path: [path] };

        expect(onChangeAction).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });
      });
    });
  });
});
