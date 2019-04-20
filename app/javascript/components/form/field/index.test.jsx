import React from 'react';
import { shallow } from 'enzyme';

import FormField from './index';

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
    const { prop, value } = props;

    expect(input).toExist();
    expect(input).toHaveProp('id', 'property-name-input');
    expect(input).toHaveProp('type', 'text');
    expect(input).toHaveProp('value', value);
    expect(input).toHaveProp('onChange', onChange);
    expect(input).toHaveProp('data-prop-name', prop);
  });

  describe('with colWidth: value', () => {
    const propsWithWidth = { ...props, colWidth: 6 };
    const renderedWithWidth = shallow(<FormField {...propsWithWidth} />);

    it('should wrap the contents in a div.form-group', () => {
      expect(renderedWithWidth).toHaveDisplayName('div');
      expect(renderedWithWidth).toHaveClassName('form-group');
      expect(renderedWithWidth).toHaveClassName('col-sm-6');
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
      const { inputId, prop, value } = propsWithId;

      expect(input).toExist();
      expect(input).toHaveProp('id', inputId);
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
      expect(input).toHaveProp('data-prop-name', prop);
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
      const { prop, value } = propsWithNamespace;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'namespace-property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
      expect(input).toHaveProp('data-prop-name', prop);
    });
  });

  describe('with type: value', () => {
    const propsWithType = { ...props, type: 'password' };
    const renderedWithType = shallow(<FormField {...propsWithType} />);

    it('should create the input', () => {
      const input = renderedWithType.find('FormInput');
      const { prop, type, value } = propsWithType;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', type);
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
      expect(input).toHaveProp('data-prop-name', prop);
    });
  });
});
