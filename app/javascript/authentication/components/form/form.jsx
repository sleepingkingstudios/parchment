import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/form';
import FormInput from '../../../components/form/input';
import FormPasswordInput from '../../../components/form/password-input';
import FormSubmitButton from '../../../components/form/submit-button';
import FormRow from '../../../components/form/row';
import { formField, formGroup } from '../../../components/form/wrappers';
import { injectProps } from '../../../utils/react';

import { formErrorsType } from '../../../components/form/entities';
import { loginFormType } from '../../entities';

const PasswordField = formField(FormPasswordInput, 'password');

const UsernameField = formField(FormInput, 'username');

const SubmitButton = formGroup(
  injectProps(FormSubmitButton, { children: 'Log In' }),
  { displayName: 'SubmitButton' },
);

const AuthenticationLoginForm = ({
  data,
  errors,
  onChangeAction,
  onSubmitAction,
  status,
}) => {
  const form = {
    data,
    errors,
    path: [],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="login-form" form={form}>
      <FormRow>
        <UsernameField form={form} colWidth={6} />

        <PasswordField form={form} colWidth={6} />
      </FormRow>

      <FormRow align="right">
        <SubmitButton
          colWidth="3"
          form={form}
          status={status}
        />
      </FormRow>
    </Form>
  );
};

AuthenticationLoginForm.defaultProps = {};

AuthenticationLoginForm.propTypes = {
  data: loginFormType.isRequired,
  errors: formErrorsType.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default AuthenticationLoginForm;
