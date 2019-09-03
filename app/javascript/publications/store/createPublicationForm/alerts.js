import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('publications/create'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to create publication.',
};

const successAlert = {
  id: generateFingerprintUuid('publications/create'),
  alertStyle: 'success',
  dismissible: true,
  message: 'Successfully created publication.',
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
