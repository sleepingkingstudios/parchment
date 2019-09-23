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
  const defaultProps = {
    id: 'property-name',
    options,
    value: 'Property Value',
    onChange,
  };

  it('should create the select input', () => {
    const rendered = shallow(<FormSelectInput {...defaultProps} />);
    const { id, value } = defaultProps;

    expect(rendered).toHaveDisplayName('select');
    expect(rendered).toHaveClassName('custom-select');
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ value });
    expect(rendered).toHaveProp({ onChange });
  });

  it('should create the select options', () => {
    const rendered = shallow(<FormSelectInput {...defaultProps} />);
    const optionElements = rendered.find('FormSelectOption');

    expect(optionElements.length).toEqual(options.length);

    optionElements.forEach((element, index) => {
      const { label, value } = options[index];

      expect(element).toHaveProp('label', label);
      expect(element).toHaveProp('value', value);
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormSelectInput {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'example-class' };

    it('should create the select input', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const { className, id, value } = props;

      expect(rendered).toHaveDisplayName('select');
      expect(rendered).toHaveClassName('custom-select');
      expect(rendered).toHaveClassName(className);
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });

    describe('with validStatus: value', () => {
      it('should create the select input', () => {
        const rendered = shallow(<FormSelectInput {...props} validStatus="invalid" />);
        const { className, id, value } = props;

        expect(rendered).toHaveDisplayName('select');
        expect(rendered).toHaveClassName('custom-select');
        expect(rendered).toHaveClassName(className);
        expect(rendered).toHaveClassName('is-invalid');
        expect(rendered).toHaveProp({ id });
        expect(rendered).toHaveProp({ value });
        expect(rendered).toHaveProp({ onChange });
      });
    });
  });

  describe('with defaultOption: value', () => {
    const defaultOption = 'Default Option';
    const props = { ...defaultProps, defaultOption };

    it('should create the select options', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const optionElements = rendered.find('FormSelectOption');
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

  describe('with options: grouped', () => {
    const groupedOptions = [
      { label: 'Option 1', value: 'one' },
      { label: 'Option 2', value: 'two' },
      { label: 'Option 3', value: 'three' },
      {
        label: 'Group 1',
        value: [
          { label: 'Option 10', value: 'ten' },
          { label: 'Option 11', value: 'eleven' },
        ],
      },
      {
        label: 'Group 2',
        value: [
          { label: 'Option 20', value: 'twenty' },
          { label: 'Option 21', value: 'twenty-one' },
        ],
      },
    ];
    const props = { ...defaultProps, options: groupedOptions };

    it('should create the non-grouped select options', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const optionElements = rendered.find('FormSelectOption');
      const ungroupedOptions = groupedOptions.filter(option => (
        !Array.isArray(option.value)
      ));

      expect(optionElements.length).toEqual(ungroupedOptions.length);

      optionElements.forEach((element, index) => {
        const { label, value } = ungroupedOptions[index];

        expect(element).toHaveProp('label', label);
        expect(element).toHaveProp('value', value);
      });
    });

    it('should create the grouped select options', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const groupElements = rendered.find('FormSelectOptionGroup');
      const groups = groupedOptions.filter(option => Array.isArray(option.value));

      expect(groupElements.length).toEqual(groups.length);

      groupElements.forEach((groupElement, groupIndex) => {
        const group = groups[groupIndex];
        const groupLabel = group.label;
        const groupOptions = group.value;
        const optionElements = groupElement.shallow().find('FormSelectOption');

        expect(groupElement).toHaveProp('label', groupLabel);
        expect(optionElements.length).toEqual(groupOptions.length);

        optionElements.forEach((element, index) => {
          const { label, value } = groupOptions[index];

          expect(element).toHaveProp('label', label);
          expect(element).toHaveProp('value', value);
        });
      });
    });
  });

  describe('with validStatus: invalid', () => {
    const props = { ...defaultProps, validStatus: 'invalid' };

    it('should create the select input', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('select');
      expect(rendered).toHaveClassName('custom-select');
      expect(rendered).toHaveClassName('is-invalid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with validStatus: valid', () => {
    const props = { ...defaultProps, validStatus: 'valid' };

    it('should create the select input', () => {
      const rendered = shallow(<FormSelectInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('select');
      expect(rendered).toHaveClassName('custom-select');
      expect(rendered).toHaveClassName('is-valid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });
});
