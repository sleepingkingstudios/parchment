import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('spells/delete'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to delete spell.',
};

const successAlert = {
  id: generateFingerprintUuid('spells/delete'),
  alertStyle: 'danger',
  dismissible: true,
  message: 'Successfully deleted spell.',
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
