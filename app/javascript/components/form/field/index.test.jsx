import React from 'react';
import { shallow } from 'enzyme';

import FormField from './index';

const MockInput = props => (
  <span {...props} />
);

describe('<FormField />', () => {
  const onChange = () => {};
  const props = { prop: 'propertyName', value: 'Property Value', onChange };
  const rendered = shallow(<FormField {...props} />);

  it('should wrap the contents in a div.form-group', () => {
    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('form-group');
    expect(rendered).toHaveClassName('col');
  });

  it('should create the label', () => {
    const label = rendered.find('label');

    expect(label).toExist();
    expect(label).toHaveProp('htmlFor', 'property-name-input');
    expect(label).toHaveProp('children', 'Property Name');
  });

  it('should create the input', () => {
    const input = rendered.find('FormInput');
    const { value } = props;

    expect(input).toExist();
    expect(input).toHaveProp('id', 'property-name-input');
    expect(input).toHaveProp('type', 'text');
    expect(input).toHaveProp('value', value);
    expect(input).toHaveProp('onChange', onChange);
  });

  describe('with colWidth: value', () => {
    const propsWithWidth = { ...props, colWidth: '6' };
    const renderedWithWidth = shallow(<FormField {...propsWithWidth} />);

    it('should wrap the contents in a div.form-group', () => {
      expect(renderedWithWidth).toHaveDisplayName('div');
      expect(renderedWithWidth).toHaveClassName('form-group');
      expect(renderedWithWidth).toHaveClassName('col-sm-6');
    });
  });

  describe('with inputClass: custom component', () => {
    const propsWithInput = { ...props, inputClass: MockInput };
    const renderedWithInput = shallow(<FormField {...propsWithInput} />);

    it('should create the label', () => {
      const label = renderedWithInput.find('label');

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'property-name-input');
      expect(label).toHaveProp('children', 'Property Name');
    });

    it('should create the input', () => {
      const input = renderedWithInput.find('MockInput');
      const { value } = propsWithInput;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with inputId: value', () => {
    const propsWithId = { ...props, inputId: 'custom-id' };
    const renderedWithId = shallow(<FormField {...propsWithId} />);

    it('should create the label', () => {
      const label = renderedWithId.find('label');
      const { inputId } = propsWithId;

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', inputId);
      expect(label).toHaveProp('children', 'Property Name');
    });

    it('should create the input', () => {
      const input = renderedWithId.find('FormInput');
      const { inputId, value } = propsWithId;

      expect(input).toExist();
      expect(input).toHaveProp('id', inputId);
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with inputProps: object', () => {
    const inputProps = { customProp: 'Custom Value' };
    const propsWithInputProps = { ...props, inputProps };
    const renderedWithInputProps = shallow(<FormField {...propsWithInputProps} />);

    it('should create the input', () => {
      const input = renderedWithInputProps.find('FormInput');
      const { value } = propsWithInputProps;
      const { customProp } = inputProps;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
      expect(input).toHaveProp('customProp', customProp);
    });
  });

  describe('with label: false', () => {
    const propsWithoutLabel = { ...props, label: false };
    const renderedWithoutLabel = shallow(<FormField {...propsWithoutLabel} />);

    it('should wrap the contents in a div.form-group', () => {
      expect(renderedWithoutLabel).toHaveDisplayName('div');
      expect(renderedWithoutLabel).toHaveClassName('form-group');
      expect(renderedWithoutLabel).toHaveClassName('form-group-no-label');
      expect(renderedWithoutLabel).toHaveClassName('col');
    });

    it('should not create the label', () => {
      const label = renderedWithoutLabel.find('label');

      expect(label).not.toExist();
    });
  });

  describe('with label: value', () => {
    const propsWithLabel = { ...props, label: 'Custom Label' };
    const renderedWithLabel = shallow(<FormField {...propsWithLabel} />);

    it('should create the label', () => {
      const label = renderedWithLabel.find('label');
      const labelText = propsWithLabel.label;

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'property-name-input');
      expect(label).toHaveProp('children', labelText);
    });
  });

  describe('with namespace: value', () => {
    const propsWithNamespace = { ...props, namespace: 'namespace' };
    const renderedWithNamespace = shallow(<FormField {...propsWithNamespace} />);

    it('should create the label', () => {
      const label = renderedWithNamespace.find('label');

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'namespace-property-name-input');
      expect(label).toHaveProp('children', 'Property Name');
    });

    it('should create the input', () => {
      const input = renderedWithNamespace.find('FormInput');
      const { value } = propsWithNamespace;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'namespace-property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with type: value', () => {
    const propsWithType = { ...props, type: 'password' };
    const renderedWithType = shallow(<FormField {...propsWithType} />);

    it('should create the input', () => {
      const input = renderedWithType.find('FormInput');
      const { type, value } = propsWithType;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', type);
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });
});
