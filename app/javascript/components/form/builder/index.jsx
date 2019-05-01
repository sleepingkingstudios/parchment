import React from 'react';

import Button from '../../button';
import FormCheckboxInput from '../checkbox-input';
import FormField from '../field';
import FormInput from '../input';
import FormNumericInput from '../numeric-input';
import FormTextAreaInput from '../text-area-input';

import {
  handleInputChangeWith,
  handleSubmitWith,
} from '../actions';
import { generateFieldId } from '../utils';
import { titleize } from '../../../utils/string';

const deleteOption = (options, prop, defaultValue = null) => {
  const value = options[prop];

  /* eslint-disable-next-line no-param-reassign */
  delete options[prop];

  if (value === null || typeof value === 'undefined') { return defaultValue; }

  return value;
};

class FormBuilder {
  constructor({
    data,
    namespace,
    onChangeAction,
    onSubmitAction,
  }) {
    this.data = data;
    this.namespace = namespace;
    this.onChangeAction = onChangeAction;
    this.onSubmitAction = onSubmitAction;

    this.onInputChange = handleInputChangeWith(onChangeAction);
    this.onSubmit = handleSubmitWith(onSubmitAction);
  }

  checkboxField(prop, opts) {
    const options = Object.assign({}, opts);
    const label = deleteOption(options, 'label', titleize(prop));
    const inputClass = FormCheckboxInput;
    const inputProps = { ...(options.inputProps || {}), label };

    return this.field(prop, Object.assign(options, { inputClass, inputProps, label: false }));
  }

  checkboxInput(prop, opts) {
    const { data, namespace, onInputChange } = this;
    const value = data[prop];
    const id = generateFieldId({ namespace, prop });
    const props = Object.assign(
      {
        id,
        label: titleize(prop),
        onChange: onInputChange(prop),
        value,
      },
      opts,
    );

    return (
      <FormCheckboxInput {...props} />
    );
  }

  field(prop, opts) {
    const { data, namespace, onInputChange } = this;
    const value = data[prop];
    const props = Object.assign(
      {
        namespace,
        onChange: onInputChange(prop),
        prop,
        value,
      },
      opts,
    );

    return (
      <FormField {...props} />
    );
  }

  hiddenSubmit() {
    const { onSubmit } = this;

    return (
      <input type="submit" className="d-none" onClick={onSubmit} />
    );
  }

  input(prop, opts) {
    const { data, namespace, onInputChange } = this;
    const value = data[prop];
    const id = generateFieldId({ namespace, prop });
    const props = Object.assign(
      {
        id,
        onChange: onInputChange(prop),
        value,
      },
      opts,
    );

    return (
      <FormInput {...props} />
    );
  }

  numericField(prop, opts) {
    const inputClass = FormNumericInput;
    const options = Object.assign({}, opts, { inputClass });

    return this.field(prop, options);
  }

  numericInput(prop, opts) {
    const { data, namespace, onInputChange } = this;
    const value = data[prop];
    const id = generateFieldId({ namespace, prop });
    const props = Object.assign(
      {
        id,
        onChange: onInputChange(prop),
        value,
      },
      opts,
    );

    return (
      <FormNumericInput {...props} />
    );
  }

  submitButton(label, opts) {
    const { onSubmit } = this;
    const props = Object.assign(
      {
        block: true,
        onClick: onSubmit,
      },
      opts,
    );

    return (
      <Button {...props}>{ label }</Button>
    );
  }

  textAreaField(prop, opts) {
    const options = Object.assign({}, opts);
    const rows = deleteOption(options, 'rows');
    const inputClass = FormTextAreaInput;
    const inputProps = { ...(options.inputProps || {}) };

    if (rows) { inputProps.rows = rows; }

    return this.field(prop, Object.assign(options, { inputClass, inputProps }));
  }

  textAreaInput(prop, opts) {
    const { data, namespace, onInputChange } = this;
    const value = data[prop];
    const id = generateFieldId({ namespace, prop });
    const props = Object.assign(
      {
        id,
        onChange: onInputChange(prop),
        value,
      },
      opts,
    );

    return (
      <FormTextAreaInput {...props} />
    );
  }
}

export default FormBuilder;
