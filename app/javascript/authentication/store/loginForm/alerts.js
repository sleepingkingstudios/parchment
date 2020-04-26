import { addAlert } from '../../../components/alerts/store/actions';
import { dig } from '../../../utils/object';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('authentication/login'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Username or password is not valid.',
};

const successAlert = username => ({
  id: generateFingerprintUuid('authentication/login'),
  alertStyle: 'success',
  dismissible: true,
  message: `Successfully logged in as ${username}`,
});

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(failureAlert);

    dispatch(action);
  },
  handleSuccess: next => ({ dispatch, getState, response }) => {
    const username = dig(response, 'json', 'data', 'user', 'username');

    next({ dispatch, getState, response });

    const action = addAlert(successAlert(username));

    dispatch(action);
  },
};
