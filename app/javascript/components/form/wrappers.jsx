import React from 'react';

import FormField from './field';
import FormGroup from './group';

import {
  handleInputChangeWith,
  handleSubmitWith,
} from './actions';
import { generateFieldId } from './utils';

export const formInput = (WrappedInput, prop) => (
  (props) => {
    const { form, ...injectedProps } = props;
    const {
      data,
      namespace,
      onChangeAction,
    } = form;
    const id = generateFieldId({ namespace, prop });
    const value = data[prop];
    const onChange = handleInputChangeWith(onChangeAction)(prop);
    const inputProps = Object.assign(
      {
        id,
        value,
        onChange,
      },
      injectedProps,
    );

    return (
      <WrappedInput {...inputProps} />
    );
  }
);

export const formField = (WrappedInput, prop) => {
  const InputClass = formInput(WrappedInput, prop);
  const FormFieldWrapper = (props) => {
    const { colWidth, form, ...injectedProps } = props;
    const { namespace } = form;

    return (
      <FormField colWidth={colWidth} prop={prop} namespace={namespace}>
        <InputClass form={form} {...injectedProps} />
      </FormField>
    );
  };

  return FormFieldWrapper;
};

export const formGroup = (WrappedInput) => {
  const FormGroupWrapper = (props) => {
    const { colWidth, form, ...injectedProps } = props;

    return (
      <FormGroup colWidth={colWidth}>
        <WrappedInput form={form} {...injectedProps} />
      </FormGroup>
    );
  };

  return FormGroupWrapper;
};

export const formSubmit = WrappedButton => (props) => {
  const { form, ...injectedProps } = props;

  const { onSubmitAction } = form;
  const onClick = handleSubmitWith(onSubmitAction);
  const buttonProps = Object.assign(
    { onClick },
    injectedProps,
  );

  return (
    <WrappedButton {...buttonProps} />
  );
};
