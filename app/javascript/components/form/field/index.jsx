import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../group';
import { formPathType } from '../entities';
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

const generateClassName = ({ className, label }) => {
  if (label === false) {
    return `form-field form-field-no-label ${className}`.trim();
  }

  return `form-field ${className}`.trim();
};

const FormField = ({
  children,
  className,
  colWidth,
  inputId,
  label,
  path,
  prop,
}) => {
  const id = generateFieldId({ inputId, path, prop });

  return (
    <FormGroup className={generateClassName({ className, label })} colWidth={colWidth}>
      { renderLabel({ id, label, prop }) }
      { children }
    </FormGroup>
  );
};

FormField.defaultProps = {
  className: '',
  colWidth: null,
  inputId: null,
  label: null,
  path: [],
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  colWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  inputId: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  path: formPathType,
  prop: PropTypes.string.isRequired,
};

export default FormField;
