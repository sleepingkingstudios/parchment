import React from 'react';
import { shallow } from 'enzyme';

import FormPasswordInput from './index';

describe('<FormPasswordInput />', () => {
  const onChange = () => {};
  const defaultProps = {
    id: 'property-name',
    value: 'Property Value',
    onChange,
  };

  it('should create the input', () => {
    const rendered = shallow(<FormPasswordInput {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormInput');
    expect(rendered).toHaveProp('type', 'password');
  });

  describe('with className: value', () => {
    it('should create the input', () => {
      const rendered = shallow(<FormPasswordInput {...defaultProps} className="example-class" />);

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp('className', 'example-class');
      expect(rendered).toHaveProp('type', 'password');
    });
  });

  describe('with placeholder: value', () => {
    it('should create the input', () => {
      const rendered = shallow(<FormPasswordInput {...defaultProps} placeholder="Placeholder Text" />);

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp('placeholder', 'Placeholder Text');
      expect(rendered).toHaveProp('type', 'password');
    });
  });

  describe('with validStatus: invalid', () => {
    it('should create the input', () => {
      const rendered = shallow(<FormPasswordInput {...defaultProps} validStatus="invalid" />);

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp('type', 'password');
      expect(rendered).toHaveProp('validStatus', 'invalid');
    });
  });

  describe('with validStatus: valid', () => {
    it('should create the input', () => {
      const rendered = shallow(<FormPasswordInput {...defaultProps} validStatus="valid" />);

      expect(rendered).toHaveDisplayName('FormInput');
      expect(rendered).toHaveProp('type', 'password');
      expect(rendered).toHaveProp('validStatus', 'valid');
    });
  });
});
