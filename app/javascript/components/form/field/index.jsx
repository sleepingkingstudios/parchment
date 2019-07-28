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

const groupClassName = ({ label }) => {
  if (label === false) { return 'form-field form-field-no-label'; }

  return 'form-field';
};

const FormField = ({
  children,
  colWidth,
  inputId,
  label,
  namespace,
  path,
  prop,
}) => {
  const id = generateFieldId({
    inputId,
    namespace,
    path,
    prop,
  });

  return (
    <FormGroup className={groupClassName({ label })} colWidth={colWidth}>
      { renderLabel({ id, label, prop }) }
      { children }
    </FormGroup>
  );
};

FormField.defaultProps = {
  colWidth: null,
  inputId: null,
  label: null,
  namespace: null,
  path: [],
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  colWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  inputId: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  namespace: PropTypes.string,
  path: formPathType,
  prop: PropTypes.string.isRequired,
};

export default FormField;
