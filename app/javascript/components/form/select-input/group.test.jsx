import React from 'react';
import { shallow } from 'enzyme';

import FormSelectOptionGroup from './group';

describe('<FormSelectOptionGroup />', () => {
  const options = [
    { label: 'Option 1', value: 'one' },
    { label: 'Option 2', value: 'two' },
    { label: 'Option 3', value: 'three' },
  ];
  const defaultProps = {
    label: 'Option Group',
    options,
  };

  it('should create the input group', () => {
    const rendered = shallow(<FormSelectOptionGroup {...defaultProps} />);
    const { label } = defaultProps;

    expect(rendered).toHaveDisplayName('optgroup');
    expect(rendered).toHaveProp({ label });
  });

  it('should create the select options', () => {
    const rendered = shallow(<FormSelectOptionGroup {...defaultProps} />);
    const optionElements = rendered.find('FormSelectOption');

    expect(optionElements.length).toEqual(options.length);

    optionElements.forEach((element, index) => {
      const { label, value } = options[index];

      expect(element).toHaveProp('label', label);
      expect(element).toHaveProp('value', value);
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormSelectOptionGroup {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
