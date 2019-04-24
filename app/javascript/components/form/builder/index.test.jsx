import React from 'react';
import { shallow } from 'enzyme';

import FormBuilder from './index';
import FormCheckboxInput from '../checkbox-input';
import FormTextareaInput from '../text-area-input';

describe('FormBuilder', () => {
  const prop = 'propertyName';
  const data = {
    boolPropertyName: true,
    propertyName: 'Property Value',
  };
  const namespace = 'namespace';
  const id = 'namespace-property-name-input';
  const onChange = jest.fn();
  const builder = new FormBuilder({ data, namespace, onChange });

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
      expect(field).toHaveProp('onChange', onChange);
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
        expect(field).toHaveProp('onChange', onChange);
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
      expect(input).toHaveProp('prop', boolProp);
      expect(input).toHaveProp('value', data.boolPropertyName);
      expect(input).toHaveProp('onChange', onChange);
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
        expect(input).toHaveProp('prop', boolProp);
        expect(input).toHaveProp('value', data.boolPropertyName);
        expect(input).toHaveProp('onChange', onChange);
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
      expect(field).toHaveProp('onChange', onChange);
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
        expect(field).toHaveProp('onChange', onChange);
      });
    });
  });

  describe('input()', () => {
    const rendered = shallow(<form>{ builder.input(prop) }</form>);

    it('should generate a form input', () => {
      const input = rendered.find('FormInput');

      expect(input).toExist();
      expect(input).toHaveProp('id', id);
      expect(input).toHaveProp('prop', prop);
      expect(input).toHaveProp('value', data.propertyName);
      expect(input).toHaveProp('onChange', onChange);
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
        expect(input).toHaveProp('prop', prop);
        expect(input).toHaveProp('type', type);
        expect(input).toHaveProp('value', data.propertyName);
        expect(input).toHaveProp('onChange', onChange);
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
      expect(field).toHaveProp('onChange', onChange);
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
        expect(field).toHaveProp('onChange', onChange);
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
      expect(input).toHaveProp('prop', prop);
      expect(input).toHaveProp('value', data.propertyName);
      expect(input).toHaveProp('onChange', onChange);
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
        expect(input).toHaveProp('prop', prop);
        expect(input).toHaveProp('value', data.propertyName);
        expect(input).toHaveProp('onChange', onChange);
      });
    });
  });
});
