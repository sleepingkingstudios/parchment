import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './form';
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

describe('<AuthenticationLoginForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const data = { username: 'Alan Bradley', password: 'tronlives' };
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
    path: [],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<LoginForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the password field', () => {
    const rendered = shallow(<LoginForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('PasswordField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormPasswordInput',
        form,
        prop: 'password',
      });
    });
  });

  it('should render the username field', () => {
    const rendered = shallow(<LoginForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('UsernameField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormInput',
        form,
        prop: 'username',
      });
    });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<LoginForm {...defaultProps} />);
    const { status } = defaultProps;

    expect(rendered).toHaveFormGroup('SubmitButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormSubmitButton', {
        children: 'Log In',
        form,
        status,
      });
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<LoginForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
