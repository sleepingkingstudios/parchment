import React from 'react';
import { shallow } from 'enzyme';

import FormField from './index';

const MockInput = () => (<input type="text" />);

describe('<FormField />', () => {
  const children = <MockInput />;
  const defaultProps = { children, prop: 'propertyName' };

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
    const input = rendered.find('MockInput');

    expect(input).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormField {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
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

    it('should match the snapshot', () => {
      const rendered = shallow(<FormField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
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
  });

  describe('with path: value', () => {
    const path = ['weapons', 'swords', 'japanese'];
    const props = { ...defaultProps, path };

    it('should create the label', () => {
      const rendered = shallow(<FormField {...props} />);
      const label = rendered.find('label');

      expect(label).toExist();
      expect(label).toHaveProp('htmlFor', 'weapons-swords-japanese-property-name-input');
      expect(label).toHaveProp('children', 'Property Name');
    });
  });
});
