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

const buildFailureAlert = (options) => {
  const action = valueOrDefault(options.action, 'process');
  const resource = valueOrDefault(options.resourceName, 'resource');
  const alertStyle = valueOrDefault(dig(options, 'failure', 'alertStyle'), 'warning');
  const message = valueOrDefault(
    dig(options, 'failure', 'message'),
    `Unable to ${action} ${resource}.`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle,
    dismissible: true,
    message,
  };
};

const buildPendingAlert = (options) => {
  const action = valueOrDefault(options.action, 'process');
  const resource = valueOrDefault(options.resourceName, 'resource');
  const alertStyle = valueOrDefault(dig(options, 'pending', 'alertStyle'), 'info');
  const message = valueOrDefault(
    dig(options, 'pending', 'message'),
    `${capitalize(progressiveTense(action))} ${resource}...`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle,
    dismissible: true,
    message,
  };
};

const buildSuccessAlert = (options) => {
  const action = valueOrDefault(options.action, 'process');
  const resource = valueOrDefault(options.resourceName, 'resource');
  const alertStyle = valueOrDefault(dig(options, 'success', 'alertStyle'), 'success');
  const message = valueOrDefault(
    dig(options, 'success', 'message'),
    `Successfully ${pastTense(action)} ${resource}.`,
  );

  return {
    id: generateFingerprintUuid(`${pluralize(resource)}/${action}`),
    alertStyle,
    dismissible: true,
    message,
  };
};

const handleFailure = options => next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const alert = buildFailureAlert(options);
  const action = addAlert(alert);

  dispatch(action);
};

const handlePending = options => next => ({ dispatch, getState }) => {
  next({ dispatch, getState });

  const alert = buildPendingAlert(options);
  const action = addAlert(alert);

  dispatch(action);
};

const handleSuccess = options => next => ({ dispatch, getState, response }) => {
  next({ dispatch, getState, response });

  const alert = buildSuccessAlert(options);
  const action = addAlert(alert);

  dispatch(action);
};

const alerts = (options) => {
  const middleware = {
    options,
    type: 'api/alerts',
  };

  if (options.failure) { middleware.handleFailure = handleFailure(options); }
  if (options.pending) { middleware.handlePending = handlePending(options); }
  if (options.success) { middleware.handleSuccess = handleSuccess(options); }

  return middleware;
};

export default alerts;
