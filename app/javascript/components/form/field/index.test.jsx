import React from 'react';
import { shallow } from 'enzyme';

import FormField from './index';

const MockInput = props => (
  <span {...props} />
);

describe('<FormField />', () => {
  const onChange = () => {};
  const defaultProps = { prop: 'propertyName', value: 'Property Value', onChange };

  it('should wrap the contents in a FormGroup', () => {
    const rendered = shallow(<FormField {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormGroup');
    expect(rendered).toHaveClassName('form-field');
    expect(rendered).not.toHaveClassName('form-field-no-label');
  });

  it('should create the label', () => {
    const rendered = shallow(<FormField {...defaultProps} />);
    const label = rendered.find('label');

    expect(label).toExist();
    expect(label).toHaveProp('htmlFor', 'property-name-input');
    expect(label).toHaveProp('children', 'Property Name');
  });

  it('should create the input', () => {
    const rendered = shallow(<FormField {...defaultProps} />);
    const input = rendered.find('FormInput');
    const { value } = defaultProps;

    expect(input).toExist();
    expect(input).toHaveProp('id', 'property-name-input');
    expect(input).toHaveProp('type', 'text');
    expect(input).toHaveProp('value', value);
    expect(input).toHaveProp('onChange', onChange);
  });

  describe('with colWidth: value', () => {
    const props = { ...defaultProps, colWidth: '6' };

    it('should wrap the contents in a FormGroup', () => {
      const rendered = shallow(<FormField {...props} />);
      const { colWidth } = props;

      expect(rendered).toHaveDisplayName('FormGroup');
      expect(rendered).toHaveClassName('form-field');
      expect(rendered).toHaveProp('colWidth', colWidth);
    });
  });

  describe('with inputClass: custom component', () => {
    const props = { ...defaultProps, inputClass: MockInput };

    it('should create the input', () => {
      const rendered = shallow(<FormField {...props} />);
      const input = rendered.find('MockInput');
      const { value } = props;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with inputId: value', () => {
    const props = { ...defaultProps, inputId: 'custom-id' };

    it('should create the label', () => {
      const rendered = shallow(<FormField {...props} />);
      const label = rendered.find('label');
      const { inputId } = props;

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', inputId);
      expect(label).toHaveProp('children', 'Property Name');
    });

    it('should create the input', () => {
      const rendered = shallow(<FormField {...props} />);
      const input = rendered.find('FormInput');
      const { inputId, value } = props;

      expect(input).toExist();
      expect(input).toHaveProp('id', inputId);
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with inputProps: object', () => {
    const inputProps = { customProp: 'Custom Value' };
    const props = { ...defaultProps, inputProps };

    it('should create the input', () => {
      const rendered = shallow(<FormField {...props} />);
      const input = rendered.find('FormInput');
      const { value } = props;
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
    const props = { ...defaultProps, label: false };

    it('should wrap the contents in a FormGroup', () => {
      const rendered = shallow(<FormField {...props} />);

      expect(rendered).toHaveDisplayName('FormGroup');
      expect(rendered).toHaveClassName('form-field');
      expect(rendered).toHaveClassName('form-field-no-label');
    });

    it('should not create the label', () => {
      const rendered = shallow(<FormField {...props} />);
      const label = rendered.find('label');

      expect(label).not.toExist();
    });
  });

  describe('with label: value', () => {
    const props = { ...defaultProps, label: 'Custom Label' };

    it('should create the label', () => {
      const rendered = shallow(<FormField {...props} />);
      const label = rendered.find('label');
      const labelText = props.label;

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'property-name-input');
      expect(label).toHaveProp('children', labelText);
    });
  });

  describe('with namespace: value', () => {
    const props = { ...defaultProps, namespace: 'namespace' };

    it('should create the label', () => {
      const rendered = shallow(<FormField {...props} />);
      const label = rendered.find('label');

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'namespace-property-name-input');
      expect(label).toHaveProp('children', 'Property Name');
    });

    it('should create the input', () => {
      const rendered = shallow(<FormField {...props} />);
      const input = rendered.find('FormInput');
      const { value } = props;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'namespace-property-name-input');
      expect(input).toHaveProp('type', 'text');
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });

  describe('with type: value', () => {
    const props = { ...defaultProps, type: 'password' };

    it('should create the input', () => {
      const rendered = shallow(<FormField {...props} />);
      const input = rendered.find('FormInput');
      const { type, value } = props;

      expect(input).toExist();
      expect(input).toHaveProp('id', 'property-name-input');
      expect(input).toHaveProp('type', type);
      expect(input).toHaveProp('value', value);
      expect(input).toHaveProp('onChange', onChange);
    });
  });
});
