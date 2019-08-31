import React from 'react';
import { shallow } from 'enzyme';

import SpellForm from './index';

import { spellsData } from '../../fixtures';
import selectSchoolOptions from './selectSchoolOptions';
import { INITIALIZED } from '../../../api/status';

describe('<SpellForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const data = { spell: spellsData[0] };
  const errors = {};
  const defaultProps = {
    data,
    onChangeAction,
    onSubmitAction,
    status: INITIALIZED,
    errors,
  };
  const form = {
    data,
    errors,
    path: ['spell'],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the name input field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('NameField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the school select field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('SchoolField');
    const options = selectSchoolOptions;

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp({ options });
  });

  it('should render the level input field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('LevelField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the ritual checkbox field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('RitualField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the casting time input field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('CastingTimeField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the range input field', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('RangeField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the duration input field', () => {
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
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('DescriptionField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);
    const input = rendered.find('SubmitButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
