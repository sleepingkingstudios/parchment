import pluralize from 'pluralize';

import { addAlert } from '../../../alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';
import {
  dig,
  valueOrDefault,
} from '../../../utils/object';
import { capitalize } from '../../../utils/string';
import {
  pastTense,
  progressiveTense,
} from '../../../utils/inflector';

const buildFailureAlert = (props) => {
  const action = valueOrDefault(props.action, 'process');
  const resource = valueOrDefault(props.resourceName, 'resource');
  const message = valueOrDefault(
    dig(props, 'failure', 'message'),
    `Unable to ${action} ${resource}.`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle: 'warning',
    dismissible: true,
    message,
  };
};

const buildPendingAlert = (props) => {
  const action = valueOrDefault(props.action, 'process');
  const resource = valueOrDefault(props.resourceName, 'resource');
  const message = valueOrDefault(
    dig(props, 'pending', 'message'),
    `${capitalize(progressiveTense(action))} ${resource}...`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle: 'info',
    dismissible: true,
    message,
  };
};

const buildSuccessAlert = (props) => {
  const action = valueOrDefault(props.action, 'process');
  const resource = valueOrDefault(props.resourceName, 'resource');
  const message = valueOrDefault(
    dig(props, 'success', 'message'),
    `Successfully ${pastTense(action)} ${resource}.`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle: 'success',
    dismissible: true,
    message,
  };
};

const handleFailure = props => next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const alert = buildFailureAlert(props);
  const action = addAlert(alert);

  dispatch(action);
};

const handlePending = props => next => ({ dispatch, getState }) => {
  next({ dispatch, getState });

  const alert = buildPendingAlert(props);
  const action = addAlert(alert);

  dispatch(action);
};

const handleSuccess = props => next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const alert = buildSuccessAlert(props);
  const action = addAlert(alert);

  dispatch(action);
};

const alerts = (props) => {
  const middleware = {};

  if (props.failure) { middleware.handleFailure = handleFailure(props); }
  if (props.pending) { middleware.handlePending = handlePending(props); }
  if (props.success) { middleware.handleSuccess = handleSuccess(props); }

  return middleware;
};

export default alerts;
