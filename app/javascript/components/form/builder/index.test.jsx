import React from 'react';
import { shallow } from 'enzyme';

import FormBuilder from './index';
import FormCheckboxInput from '../checkbox-input';
import FormNumericInput from '../numeric-input';
import FormTextareaInput from '../text-area-input';

describe('FormBuilder', () => {
  const prop = 'propertyName';
  const data = {
    boolPropertyName: true,
    numericPropertyName: 3,
    propertyName: 'Property Value',
  };
  const namespace = 'namespace';
  const id = 'namespace-property-name-input';
  const onChangeAction = jest.fn(obj => ({ payload: obj }));
  const builder = new FormBuilder({ data, namespace, onChangeAction });

  describe('checkboxField()', () => {
    const boolProp = 'boolPropertyName';
    const rendered = shallow(<form>{ builder.checkboxField(boolProp) }</form>);

    it('should generate a form field', () => {
      const field = rendered.find('FormField');
      const label = 'Bool Property Name';

      expect(field).toExist();
      expect(field).toHaveProp('inputClass', FormCheckboxInput);
      expect(field).toHaveProp('inputProps', { label });
      expect(field).toHaveProp('label', false);
      expect(field).toHaveProp('namespace', namespace);
      expect(field).toHaveProp('prop', boolProp);
      expect(field).toHaveProp('value', data.boolPropertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormField');
      const value = true;
      const { onChange } = field.props();
      const event = { target: { checked: value, type: 'checkbox' } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: boolProp, value });
      expect(action).toEqual({ payload: { propName: boolProp, value } });
    });

    describe('with custom options', () => {
      const opts = { label: 'Custom Label' };
      const renderedWithOpts = shallow(<form>{ builder.checkboxField(boolProp, opts) }</form>);

      it('should generate a form field', () => {
        const field = renderedWithOpts.find('FormField');
        const { label } = opts;

        expect(field).toExist();
        expect(field).toHaveProp('inputClass', FormCheckboxInput);
        expect(field).toHaveProp('inputProps', { label });
        expect(field).toHaveProp('label', false);
        expect(field).toHaveProp('namespace', namespace);
        expect(field).toHaveProp('prop', boolProp);
        expect(field).toHaveProp('value', data.boolPropertyName);
      });
    });
  });

  describe('checkboxInput()', () => {
    const boolProp = 'boolPropertyName';
    const boolId = 'namespace-bool-property-name-input';
    const rendered = shallow(<form>{ builder.checkboxInput(boolProp) }</form>);

    it('should generate a checkbox input', () => {
      const input = rendered.find('FormCheckboxInput');

      expect(input).toExist();
      expect(input).toHaveProp('id', boolId);
      expect(input).toHaveProp('label', 'Bool Property Name');
      expect(input).toHaveProp('value', data.boolPropertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormCheckboxInput');
      const value = true;
      const { onChange } = field.props();
      const event = { target: { checked: value, type: 'checkbox' } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: boolProp, value });
      expect(action).toEqual({ payload: { propName: boolProp, value } });
    });

    describe('with custom options', () => {
      const opts = { label: 'Custom Label' };
      const renderedWithOpts = shallow(<form>{ builder.checkboxInput(boolProp, opts) }</form>);

      it('should generate a checkbox input', () => {
        const input = renderedWithOpts.find('FormCheckboxInput');
        const { label } = opts;

        expect(input).toExist();
        expect(input).toHaveProp('id', boolId);
        expect(input).toHaveProp('label', label);
        expect(input).toHaveProp('value', data.boolPropertyName);
      });
    });
  });

  describe('field()', () => {
    const rendered = shallow(<form>{ builder.field(prop) }</form>);

    it('should generate a form field', () => {
      const field = rendered.find('FormField');

      expect(field).toExist();
      expect(field).toHaveProp('namespace', namespace);
      expect(field).toHaveProp('prop', prop);
      expect(field).toHaveProp('value', data.propertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormField');
      const value = 'Property Value';
      const { onChange } = field.props();
      const event = { target: { checked: value, type: 'checkbox' } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: prop, value });
      expect(action).toEqual({ payload: { propName: prop, value } });
    });

    describe('with custom options', () => {
      const opts = {
        inputClass: FormTextareaInput,
        inputProps: { rows: 7 },
      };
      const renderedWithOpts = shallow(<form>{ builder.field(prop, opts) }</form>);

      it('should generate a form field', () => {
        const field = renderedWithOpts.find('FormField');
        const { inputClass, inputProps } = opts;

        expect(field).toExist();
        expect(field).toHaveProp('inputClass', inputClass);
        expect(field).toHaveProp('inputProps', inputProps);
        expect(field).toHaveProp('namespace', namespace);
        expect(field).toHaveProp('prop', prop);
        expect(field).toHaveProp('value', data.propertyName);
      });
    });
  });

  describe('input()', () => {
    const rendered = shallow(<form>{ builder.input(prop) }</form>);

    it('should generate a form input', () => {
      const input = rendered.find('FormInput');

      expect(input).toExist();
      expect(input).toHaveProp('id', id);
      expect(input).toHaveProp('value', data.propertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormInput');
      const value = 'Property Value';
      const { onChange } = field.props();
      const event = { target: { checked: value, type: 'checkbox' } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: prop, value });
      expect(action).toEqual({ payload: { propName: prop, value } });
    });

    describe('with custom options', () => {
      const opts = {
        placeholder: 'Enter your password.',
        type: 'password',
      };
      const renderedWithOpts = shallow(<form>{ builder.input(prop, opts) }</form>);

      it('should generate a form input', () => {
        const input = renderedWithOpts.find('FormInput');
        const { placeholder, type } = opts;

        expect(input).toExist();
        expect(input).toHaveProp('id', id);
        expect(input).toHaveProp('placeholder', placeholder);
        expect(input).toHaveProp('type', type);
        expect(input).toHaveProp('value', data.propertyName);
      });
    });
  });

  describe('numericField()', () => {
    const numericProp = 'numericPropertyName';

    it('should generate a form field', () => {
      const rendered = shallow(<form>{ builder.numericField(numericProp) }</form>);
      const field = rendered.find('FormField');

      expect(field).toExist();
      expect(field).toHaveProp('inputClass', FormNumericInput);
      expect(field).toHaveProp('namespace', namespace);
      expect(field).toHaveProp('value', data.numericPropertyName);
    });

    it('should set the onChange event handler', () => {
      const rendered = shallow(<form>{ builder.numericField(numericProp) }</form>);
      const field = rendered.find('FormField');
      const value = 3;
      const { onChange } = field.props();
      const event = { target: { value } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: numericProp, value });
      expect(action).toEqual({ payload: { propName: numericProp, value } });
    });

    describe('with custom options', () => {
      const opts = { colWidth: '6' };

      it('should generate a form field', () => {
        const rendered = shallow(<form>{ builder.numericField(numericProp, opts) }</form>);
        const field = rendered.find('FormField');
        const { colWidth } = opts;

        expect(field).toExist();
        expect(field).toHaveProp('colWidth', colWidth);
        expect(field).toHaveProp('namespace', namespace);
        expect(field).toHaveProp('prop', numericProp);
        expect(field).toHaveProp('value', data.numericPropertyName);
      });
    });
  });

  describe('numericInput()', () => {
    const numericProp = 'numericPropertyName';
    const numericId = 'namespace-numeric-property-name-input';

    it('should generate a form input', () => {
      const rendered = shallow(<form>{ builder.numericInput(numericProp) }</form>);
      const input = rendered.find('FormNumericInput');

      expect(input).toExist();
      expect(input).toHaveProp('id', numericId);
      expect(input).toHaveProp('value', data.numericPropertyName);
    });

    it('should set the onChange event handler', () => {
      const rendered = shallow(<form>{ builder.numericInput(numericProp) }</form>);
      const field = rendered.find('FormNumericInput');
      const value = 3;
      const { onChange } = field.props();
      const event = { target: { value } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: numericProp, value });
      expect(action).toEqual({ payload: { propName: numericProp, value } });
    });

    describe('with custom options', () => {
      const opts = { placeholder: 'Enter a number.' };

      it('should generate a form input', () => {
        const rendered = shallow(<form>{ builder.numericInput(numericProp, opts) }</form>);
        const input = rendered.find('FormNumericInput');
        const { placeholder } = opts;

        expect(input).toExist();
        expect(input).toHaveProp('id', numericId);
        expect(input).toHaveProp('placeholder', placeholder);
        expect(input).toHaveProp('value', data.numericPropertyName);
      });
    });
  });

  describe('textAreaField()', () => {
    const rendered = shallow(<form>{ builder.textAreaField(prop) }</form>);

    it('should generate a textarea field', () => {
      const field = rendered.find('FormField');

      expect(field).toExist();
      expect(field).toHaveProp('inputClass', FormTextareaInput);
      expect(field).toHaveProp('inputProps', {});
      expect(field).toHaveProp('namespace', namespace);
      expect(field).toHaveProp('prop', prop);
      expect(field).toHaveProp('value', data.propertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormField');
      const value = 'Property Value';
      const { onChange } = field.props();
      const event = { target: { checked: value, type: 'checkbox' } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: prop, value });
      expect(action).toEqual({ payload: { propName: prop, value } });
    });

    describe('with custom options', () => {
      const opts = { rows: 3 };
      const renderedWithOpts = shallow(<form>{ builder.textAreaField(prop, opts) }</form>);

      it('should generate a textarea field', () => {
        const field = renderedWithOpts.find('FormField');
        const { rows } = opts;

        expect(field).toExist();
        expect(field).toHaveProp('inputClass', FormTextareaInput);
        expect(field).toHaveProp('inputProps', { rows });
        expect(field).toHaveProp('namespace', namespace);
        expect(field).toHaveProp('prop', prop);
        expect(field).toHaveProp('value', data.propertyName);
      });
    });
  });

  describe('textAreaInput()', () => {
    const rendered = shallow(<form>{ builder.textAreaInput(prop) }</form>);

    it('should generate a textarea input', () => {
      const input = rendered.find('FormTextAreaInput');

      expect(input).toExist();
      expect(input).toHaveProp('id', id);
      expect(input).toHaveProp('rows', 3);
      expect(input).toHaveProp('value', data.propertyName);
    });

    it('should set the onChange event handler', () => {
      const field = rendered.find('FormTextAreaInput');
      const value = 'Property Value';
      const { onChange } = field.props();
      const event = { target: { value } };

      expect(typeof onChange).toEqual('function');

      const action = onChange(event);

      expect(onChangeAction).toHaveBeenCalledWith({ propName: prop, value });
      expect(action).toEqual({ payload: { propName: prop, value } });
    });

    describe('with custom options', () => {
      const opts = { rows: 7 };
      const renderedWithOpts = shallow(<form>{ builder.textAreaInput(prop, opts) }</form>);

      it('should generate a textarea input', () => {
        const input = renderedWithOpts.find('FormTextAreaInput');
        const { rows } = opts;

        expect(input).toExist();
        expect(input).toHaveProp('id', id);
        expect(input).toHaveProp('rows', rows);
        expect(input).toHaveProp('value', data.propertyName);
      });
    });
  });
});
