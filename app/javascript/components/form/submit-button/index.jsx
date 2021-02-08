import React from 'react';
import PropTypes from 'prop-types';

import { PENDING } from 'api/status';
import Button from 'components/button';
import Spinner from 'components/spinner';
import { convertToArray } from 'utils/array';
import { progressiveTense } from 'utils/inflector';
import { valueOrDefault } from 'utils/object';
import { handleSubmitWith } from '../actions';
import { generateFieldId } from '../utils';

const buttonText = ({ actionName, resourceName, status }) => {
  if (status !== PENDING) { return `${actionName} ${resourceName}`; }

  return (
    <span className="loading-message loading-message-pending">
      <Spinner size="sm" style={{ position: 'relative', top: '-0.1em' }} />
      {' '}
      {progressiveTense(actionName)} {resourceName}...
    </span>
  );
};

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
    status,
    ...injectedProps
  } = props;
  const { path, onSubmitAction } = form;
  const actualPath = convertToArray(path);
  const className = classNameForSubmit({ path: actualPath });
  const onClick = handleSubmitWith(onSubmitAction);
  const buttonProps = Object.assign(
    {
      children: valueOrDefault(
        children,
        buttonText({ actionName, resourceName, status }),
      ),
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
  status: null,
};

FormSubmitButton.propTypes = {
  actionName: PropTypes.string,
  children: PropTypes.node,
  form: PropTypes.shape({
    onSubmitAction: PropTypes.func.isRequired,
    path: PropTypes.array,
  }).isRequired,
  resourceName: PropTypes.string,
  status: PropTypes.string,
};

export default FormSubmitButton;
