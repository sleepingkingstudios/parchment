import React from 'react';
import { shallow, mount } from 'enzyme';

import SpellForm, {
  LevelField,
  NameField,
  RitualField,
  SchoolField,
  CastingTimeField,
  RangeField,
  DurationField,
  DescriptionField,
  SubmitButton,
} from './index';

import { spellsData } from '../fixtures';
import selectSchoolOptions from './selectSchoolOptions';

describe('<SpellForm />', () => {
  const onChangeAction = jest.fn(({ propName, value }) => ({ payload: { propName, value } }));
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const spell = spellsData[0];
  const defaultProps = {
    onChangeAction,
    onSubmitAction,
    spell,
  };
  const form = {
    data: spell,
    namespace: 'spell',
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the name input field', () => {
    expect(NameField.inputDisplayName).toEqual('FormInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('NameField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the school select field', () => {
    expect(SchoolField.inputDisplayName).toEqual('FormSelectInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('SchoolField');
    const options = selectSchoolOptions;

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp({ options });
  });

  it('should render the level input field', () => {
    expect(LevelField.inputDisplayName).toEqual('FormNumericInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('LevelField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the ritual checkbox field', () => {
    expect(RitualField.inputDisplayName).toEqual('FormCheckboxInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('RitualField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the casting time input field', () => {
    expect(CastingTimeField.inputDisplayName).toEqual('FormInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('CastingTimeField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the range input field', () => {
    expect(RangeField.inputDisplayName).toEqual('FormInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('RangeField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the duration input field', () => {
    expect(DurationField.inputDisplayName).toEqual('FormInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('DurationField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the components field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('SpellFormComponentsField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the description textarea field', () => {
    expect(DescriptionField.inputDisplayName).toEqual('FormTextAreaInput');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('DescriptionField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the submit button', () => {
    expect(SubmitButton.inputDisplayName).toEqual('Button');

    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('SubmitButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp('children', 'Create Spell');
  });

  it('should match the snapshot', () => {
    const rendered = mount(<SpellForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const props = { ...defaultProps, isUpdate: true };

    it('should render the submit button', () => {
      expect(SubmitButton.inputDisplayName).toEqual('Button');

      const rendered = shallow(<SpellForm {...props} />);
      const input = rendered.find('SubmitButton');

      expect(input).toExist();
      expect(input).toHaveProp({ form });
      expect(input).toHaveProp('children', 'Update Spell');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SpellForm {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
