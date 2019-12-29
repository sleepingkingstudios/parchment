import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('books/create'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to create book.',
};

const successAlert = {
  id: generateFingerprintUuid('books/create'),
  alertStyle: 'success',
  dismissible: true,
  message: 'Successfully created book.',
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
