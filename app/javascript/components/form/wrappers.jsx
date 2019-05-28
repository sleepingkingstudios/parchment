import React from 'react';

import FormField from './field';
import FormGroup from './group';

import {
  handleInputChangeWith,
  handleSubmitWith,
} from './actions';
import { generateFieldId } from './utils';
import { upperCamelize } from '../../utils/string';

const getInputDisplayName = Component => (
  Component.inputDisplayName
    || Component.displayName
    || Component.name
    || 'Component'
);

export const formInput = (WrappedInput, prop, opts = {}) => {
  const FormInputWrapper = (props) => {
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
  };

  const { displayName } = opts;

  FormInputWrapper.displayName = displayName || `${upperCamelize(prop)}Input`;
  FormInputWrapper.inputDisplayName = getInputDisplayName(WrappedInput);

  return FormInputWrapper;
};

export const formField = (WrappedInput, prop, opts = {}) => {
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

  const { displayName } = opts;

  FormFieldWrapper.displayName = displayName || `${upperCamelize(prop)}Field`;
  FormFieldWrapper.inputDisplayName = getInputDisplayName(WrappedInput);

  return FormFieldWrapper;
};

export const formGroup = (WrappedInput, opts = {}) => {
  const FormGroupWrapper = (props) => {
    const { colWidth, form, ...injectedProps } = props;

    return (
      <FormGroup colWidth={colWidth}>
        <WrappedInput form={form} {...injectedProps} />
      </FormGroup>
    );
  };

  const { displayName } = opts;

  FormGroupWrapper.displayName = displayName || 'FormGroupWrapper';
  FormGroupWrapper.inputDisplayName = getInputDisplayName(WrappedInput);

  return FormGroupWrapper;
};

export const formSubmit = (WrappedButton, opts = {}) => {
  const FormSubmitWrapper = (props) => {
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

  const { displayName } = opts;

  FormSubmitWrapper.displayName = displayName || 'FormSubmitWrapper';
  FormSubmitWrapper.inputDisplayName = getInputDisplayName(WrappedButton);

  return FormSubmitWrapper;
};