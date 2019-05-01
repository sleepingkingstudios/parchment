import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../group';
import FormInput from '../input';
import { generateFieldId } from '../utils';
import { titleize } from '../../../utils/string';

import './styles.css';

const labelText = ({ label, prop }) => {
  if (label) { return label; }

  return titleize(prop);
};

const renderLabel = ({ id, label, prop }) => {
  if (label === false) { return null; }

  return (
    <label htmlFor={id}>{ labelText({ label, prop }) }</label>
  );
};

const groupClassName = ({ label }) => {
  if (label === false) { return 'form-field form-field-no-label'; }

  return 'form-field';
};

const FormField = ({
  colWidth,
  inputId,
  inputClass,
  inputProps,
  label,
  namespace,
  prop,
  type,
  value,
  onChange,
}) => {
  const id = generateFieldId({ inputId, namespace, prop });
  const propsForInput = Object.assign({}, {
    id,
    prop,
    type,
    value,
    onChange,
  }, inputProps);
  const InputClass = inputClass || FormInput;

  return (
    <FormGroup className={groupClassName({ label })} colWidth={colWidth}>
      { renderLabel({ id, label, prop }) }
      <InputClass {...propsForInput} />
    </FormGroup>
  );
};

FormField.defaultProps = {
  colWidth: null,
  inputClass: null,
  inputId: null,
  inputProps: null,
  label: null,
  namespace: null,
  type: 'text',
};

FormField.propTypes = {
  colWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  inputClass: PropTypes.func,
  inputId: PropTypes.string,
  /* eslint-disable-next-line react/forbid-prop-types */
  inputProps: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  namespace: PropTypes.string,
  prop: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default FormField;
