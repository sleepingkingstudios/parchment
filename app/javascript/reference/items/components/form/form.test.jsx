import React from 'react';
import { shallow } from 'enzyme';

import ItemForm from './form';
import { INITIALIZED } from '../../../../api/status';
import {
  toHaveFormControl,
  toHaveFormGroup,
  toHaveFormInput,
} from '../../../../utils/enzyme';

expect.extend({
  toHaveFormControl: toHaveFormControl(expect),
  toHaveFormGroup: toHaveFormGroup(expect),
  toHaveFormInput: toHaveFormInput(expect),
});

describe('<ItemForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const item = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Big Red Button',
    slug: 'big-red-button',
    cost: '1 cp',
    data: {
      color: 'red',
      size: 'big',
    },
    description: "It's a big red button. Press it to destroy the world!",
    shortDescription: 'An ominous button.',
    type: null,
  };
  const data = { item };
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
    path: ['item'],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the cost field', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CostField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'cost' });
    });
  });

  it('should render the description field', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('DescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormTextAreaInput',
        form,
        prop: 'description',
      });
    });
  });

  it('should render the name field', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('NameField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'name' });
    });
  });

  it('should render the shortDescription field', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('ShortDescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'shortDescription' });
    });
  });

  it('should render the slug field', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('SlugField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'slug' });
    });
  });

  it('should render the cancel button', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormCancelButton', {
        baseUrl: '/items',
        form,
        isUpdate: false,
        resourceName: 'Item',
      });
    });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);
    const { status } = defaultProps;

    expect(rendered).toHaveFormGroup('SubmitButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormSubmitButton', {
        actionName: 'Create',
        form,
        resourceName: 'Item',
        status,
      });
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<ItemForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/reference/items';

    it('should render the cancel button', () => {
      const rendered = shallow(<ItemForm {...defaultProps} baseUrl={baseUrl} />);

      expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
        expect(formGroup).toHaveFormControl('FormCancelButton', {
          baseUrl,
          form,
          isUpdate: false,
          resourceName: 'Item',
        });
      });
    });
  });
});
