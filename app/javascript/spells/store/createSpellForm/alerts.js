import { addAlert } from '../../../alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('spells/create'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to create spell.',
};

const successAlert = {
  id: generateFingerprintUuid('spells/create'),
  alertStyle: 'success',
  dismissible: true,
  message: 'Successfully created spell.',
};

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(failureAlert);

    dispatch(action);
  },
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(successAlert);

    dispatch(action);
  },
};
