import React from 'react';
import { shallow } from 'enzyme';

import FormSelectInput from './index';

describe('<FormSelectInput />', () => {
  const onChange = () => {};
  const options = [
    { label: 'Option 1', value: 'one' },
    { label: 'Option 2', value: 'two' },
    { label: 'Option 3', value: 'three' },
  ];
  const props = {
    id: 'property-name',
    options,
    value: 'Property Value',
    onChange,
  };
  const rendered = shallow(<FormSelectInput {...props} />);

  it('should create the select input', () => {
    const { id, value } = props;

    expect(rendered).toHaveDisplayName('select');
    expect(rendered).toHaveClassName('custom-select');
    expect(rendered).toHaveProp('id', id);
    expect(rendered).toHaveProp('value', value);
    expect(rendered).toHaveProp('onChange', onChange);
  });

  it('should create the select options', () => {
    const optionElements = rendered.find('FormSelectOption');

    expect(optionElements.length).toEqual(options.length);

    optionElements.forEach((element, index) => {
      const { label, value } = options[index];

      expect(element).toHaveProp('label', label);
      expect(element).toHaveProp('value', value);
    });
  });

  describe('with defaultOption: value', () => {
    const defaultOption = 'Default Option';
    const propsWithDefault = {
      id: 'property-name',
      defaultOption,
      options,
      value: 'Property Value',
      onChange,
    };
    const renderedWithDefault = shallow(<FormSelectInput {...propsWithDefault} />);

    it('should create the select options', () => {
      const optionElements = renderedWithDefault.find('FormSelectOption');
      const expectedOptions = options.map(item => item);

      expectedOptions.unshift({ label: defaultOption, value: '' });

      expect(optionElements.length).toEqual(expectedOptions.length);

      optionElements.forEach((element, index) => {
        const { label, value } = expectedOptions[index];

        expect(element).toHaveProp('label', label);
        expect(element).toHaveProp('value', value);
      });
    });
  });
});
