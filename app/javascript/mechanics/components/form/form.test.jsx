import React from 'react';
import { shallow } from 'enzyme';

import MechanicForm from './form';
import { INITIALIZED } from '../../../api/status';
import {
  toHaveFormControl,
  toHaveFormGroup,
  toHaveFormInput,
} from '../../../utils/enzyme';

expect.extend({
  toHaveFormControl: toHaveFormControl(expect),
  toHaveFormGroup: toHaveFormGroup(expect),
  toHaveFormInput: toHaveFormInput(expect),
});

describe('<MechanicForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const mechanic = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-Destruct',
    description: 'Destroy yourself in a giant explosion',
    shortDescription: 'Sacrifice yourself to destroy others',
    notes: '',
  };
  const data = { mechanic };
  const errors = {};
  const defaultProps = {
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    status: INITIALIZED,
  };
  const form = {
    data,
    errors,
    path: ['mechanic'],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the description field', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('DescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormTextAreaInput',
        form,
        prop: 'description',
      });
    });
  });

  it('should render the name field', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('NameField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'name' });
    });
  });

  it('should render the notes field', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('NotesField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormTextAreaInput',
        form,
        prop: 'notes',
      });
    });
  });

  it('should render the shortDescription field', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('ShortDescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'shortDescription' });
    });
  });

  it('should render the cancel button', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormCancelButton', {
        baseUrl: '/mechanics',
        form,
        isUpdate: false,
        resourceName: 'Mechanic',
      });
    });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);
    const { status } = defaultProps;

    expect(rendered).toHaveFormGroup('SubmitButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormSubmitButton', {
        actionName: 'Create',
        form,
        resourceName: 'Mechanic',
        status,
      });
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<MechanicForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/mechanics/widgets';

    it('should render the cancel button', () => {
      const rendered = shallow(<MechanicForm {...defaultProps} baseUrl={baseUrl} />);

      expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
        expect(formGroup).toHaveFormControl('FormCancelButton', {
          baseUrl,
          form,
          isUpdate: false,
          resourceName: 'Mechanic',
        });
      });
    });
  });
});
