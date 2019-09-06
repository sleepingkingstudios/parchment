import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('publications/delete'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to delete publication.',
};

const successAlert = {
  id: generateFingerprintUuid('publications/delete'),
  alertStyle: 'danger',
  dismissible: true,
  message: 'Successfully deleted publication.',
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
