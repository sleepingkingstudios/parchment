import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import { handleSubmitWith } from '../actions';
import { generateFieldId } from '../utils';
import { convertToArray } from '../../../utils/array';
import { valueOrDefault } from '../../../utils/object';

const buttonText = ({ actionName, resourceName }) => `${actionName} ${resourceName}`;

const classNameForSubmit = ({ path }) => {
  if (path.length === 0) { return 'form-submit'; }

  return `form-submit ${
    generateFieldId({ path, prop: 'form', suffix: 'submit' })
  }`;
};

const FormSubmitButton = (props) => {
  const {
    actionName,
    children,
    form,
    resourceName,
    ...injectedProps
  } = props;
  const { path, onSubmitAction } = form;
  const actualPath = convertToArray(path);
  const className = classNameForSubmit({ path: actualPath });
  const onClick = handleSubmitWith(onSubmitAction);
  const buttonProps = Object.assign(
    {
      children: valueOrDefault(children, buttonText({ actionName, resourceName })),
      className,
      onClick,
    },
    injectedProps,
  );

  return (
    <Button block outline {...buttonProps} />
  );
};

FormSubmitButton.defaultProps = {
  actionName: 'Submit',
  children: null,
  resourceName: 'Form',
};

FormSubmitButton.propTypes = {
  actionName: PropTypes.string,
  children: PropTypes.node,
  form: PropTypes.shape({
    onSubmitAction: PropTypes.func.isRequired,
    path: PropTypes.array,
  }).isRequired,
  resourceName: PropTypes.string,
};

export default FormSubmitButton;
