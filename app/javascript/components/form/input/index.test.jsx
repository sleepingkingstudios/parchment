import React from 'react';
import { shallow } from 'enzyme';

import FormInput from './index';

describe('<FormInput />', () => {
  const onChange = () => {};
  const props = {
    id: 'property-name',
    prop: 'propertyName',
    value: 'Property Value',
    onChange,
  };
  const rendered = shallow(<FormInput {...props} />);

  it('should create the input', () => {
    const { id, prop, value } = props;

    expect(rendered).toHaveDisplayName('input');
    expect(rendered).toHaveClassName('form-control');
    expect(rendered).toHaveProp('id', id);
    expect(rendered).toHaveProp('type', 'text');
    expect(rendered).toHaveProp('value', value);
    expect(rendered).toHaveProp('onChange', onChange);
    expect(rendered).toHaveProp('data-prop-name', prop);
  });

  describe('with placeholder: value', () => {
    const placeholder = 'Placeholder Text';
    const propsWithPlaceholder = { ...props, placeholder };
    const renderedWithPlaceholder = shallow(<FormInput {...propsWithPlaceholder} />);

    it('should create the input', () => {
      const {
        id,
        prop,
        value,
      } = propsWithPlaceholder;

      expect(renderedWithPlaceholder).toHaveDisplayName('input');
      expect(renderedWithPlaceholder).toHaveClassName('form-control');
      expect(renderedWithPlaceholder).toHaveProp('id', id);
      expect(renderedWithPlaceholder).toHaveProp('placeholder', placeholder);
      expect(renderedWithPlaceholder).toHaveProp('type', 'text');
      expect(renderedWithPlaceholder).toHaveProp('value', value);
      expect(renderedWithPlaceholder).toHaveProp('onChange', onChange);
      expect(renderedWithPlaceholder).toHaveProp('data-prop-name', prop);
    });
  });

  describe('with type: value', () => {
    const propsWithType = { ...props, type: 'password' };
    const renderedWithType = shallow(<FormInput {...propsWithType} />);

    it('should create the input', () => {
      const {
        id,
        prop,
        type,
        value,
      } = propsWithType;

      expect(renderedWithType).toHaveDisplayName('input');
      expect(renderedWithType).toHaveClassName('form-control');
      expect(renderedWithType).toHaveProp('id', id);
      expect(renderedWithType).toHaveProp('type', type);
      expect(renderedWithType).toHaveProp('value', value);
      expect(renderedWithType).toHaveProp('onChange', onChange);
      expect(renderedWithType).toHaveProp('data-prop-name', prop);
    });
  });
});
