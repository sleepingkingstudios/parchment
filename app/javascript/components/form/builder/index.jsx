import React from 'react';

import FormCheckboxInput from '../checkbox-input';
import FormField from '../field';
import FormInput from '../input';
import FormTextAreaInput from '../text-area-input';

import { handleInputChangeWith } from '../actions';
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
  constructor({ data, namespace, onChangeAction }) {
    this.data = data;
    this.namespace = namespace;
    this.onChangeAction = onChangeAction;
    this.onInputChange = handleInputChangeWith(onChangeAction);
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
