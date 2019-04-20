import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../input';

import {
  titleize,
  underscore,
} from '../../../utils/string';

const fieldId = ({ inputId, namespace, prop }) => {
  if (inputId) { return inputId; }

  const segments = [];

  if (namespace) { segments.push(namespace); }

  segments.push(underscore(prop).replace('_', '-'));

  segments.push('input');

  return segments.join('-');
};

const labelText = ({ label, prop }) => {
  if (label) { return label; }

  return titleize(prop);
};

const wrapperClassName = ({ colWidth }) => {
  const classes = ['form-group'];

  if (colWidth) {
    classes.push(`col-sm-${Math.round(colWidth)}`);
  } else {
    classes.push('col');
  }

  return classes.join(' ');
};

const FormField = ({
  colWidth,
  inputId,
  label,
  namespace,
  prop,
  type,
  value,
  onChange,
}) => {
  const id = fieldId({ inputId, namespace, prop });
  const inputProps = {
    id,
    prop,
    type,
    value,
    onChange,
    'data-prop-name': prop,
  };

  return (
    <div className={wrapperClassName({ colWidth })}>
      <label htmlFor={id}>{ labelText({ label, prop }) }</label>
      <FormInput {...inputProps} />
    </div>
  );
};

FormField.defaultProps = {
  colWidth: null,
  InputClass: null,
  inputId: null,
  label: null,
  namespace: null,
  type: 'text',
};

FormField.propTypes = {
  colWidth: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  InputClass: PropTypes.func,
  inputId: PropTypes.string,
  label: PropTypes.string,
  namespace: PropTypes.string,
  prop: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormField;
