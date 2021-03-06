import React from 'react';

import FormField from './field';
import FormGroup from './group';

import { handleInputChangeWith } from './actions';
import { generateFieldId } from './utils';
import { convertToArray } from '../../utils/array';
import {
  assign,
  dig,
  valueOrDefault,
} from '../../utils/object';
import { upperCamelize } from '../../utils/string';

const defaultMapDataToValue = ({ data, path, prop }) => dig(data, ...path, prop);

const defaultMapValueToData = ({ prop, value }) => assign({}, value, prop);

const getInputDisplayName = Component => (
  Component.inputDisplayName
    || Component.displayName
    || Component.name
    || 'Component'
);

const errorFeedback = (propErrors) => {
  if (typeof propErrors === 'undefined') { return null; }
  if (propErrors === null) { return null; }
  if (propErrors.length === 0) { return null; }

  return (
    <div className="invalid-feedback">{ propErrors.join(', ') }</div>
  );
};

export const formInput = (WrappedInput, prop, opts = {}) => {
  const mapDataToValue = valueOrDefault(opts.mapDataToValue, defaultMapDataToValue);
  const mapValueToData = valueOrDefault(opts.mapValueToData, defaultMapValueToData);
  const mapDataToPlaceholder = valueOrDefault(opts.mapDataToPlaceholder, () => null);

  const FormInputWrapper = (props) => {
    const { form, ...injectedProps } = props;
    const {
      data,
      path,
      onChangeAction,
    } = form;
    const actualPath = convertToArray(path);
    const id = generateFieldId({ path, prop });
    const value = mapDataToValue({ data, path: actualPath, prop });
    const placeholder = mapDataToPlaceholder({ data, path: actualPath, prop });
    const onChange = handleInputChangeWith(onChangeAction, mapValueToData)({
      path: actualPath,
      propName: prop,
    });
    const inputProps = Object.assign(
      {
        id,
        placeholder,
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
  const { displayName, ...injectedOpts } = opts;

  const InputClass = formInput(WrappedInput, prop, injectedOpts);
  const FormFieldWrapper = (props) => {
    const { colWidth, form, ...injectedProps } = props;
    const { errors, path } = form;
    const propErrors = errors ? errors[prop] : [];
    const actualPath = convertToArray(path);
    const className = `${generateFieldId(
      { path: actualPath, prop, suffix: 'field' },
    )}`;

    if (propErrors && propErrors.length > 0) {
      injectedProps.validStatus = 'invalid';
    }

    return (
      <FormField className={className} colWidth={colWidth} path={actualPath} prop={prop}>
        <InputClass form={form} {...injectedProps} />
        { errorFeedback(propErrors) }
      </FormField>
    );
  };

  FormFieldWrapper.displayName = displayName || `${upperCamelize(prop)}Field`;
  FormFieldWrapper.inputDisplayName = getInputDisplayName(WrappedInput);

  return FormFieldWrapper;
};

export const formGroup = (WrappedInput, opts = {}) => {
  const { propName } = opts;

  const FormGroupWrapper = (props) => {
    const { colWidth, form, ...injectedProps } = props;
    const { errors } = form;
    const propErrors = errors ? errors[propName] : [];

    if (propErrors && propErrors.length > 0) {
      injectedProps.validStatus = 'invalid';
    }

    return (
      <FormGroup colWidth={colWidth}>
        <WrappedInput form={form} {...injectedProps} />
        { errorFeedback(propErrors) }
      </FormGroup>
    );
  };

  const { displayName } = opts;

  FormGroupWrapper.displayName = displayName || 'FormGroupWrapper';
  FormGroupWrapper.inputDisplayName = getInputDisplayName(WrappedInput);

  return FormGroupWrapper;
};
