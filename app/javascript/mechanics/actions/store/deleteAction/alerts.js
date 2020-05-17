import { addAlert } from '../../../../alerts/store/actions';
import { generateFingerprintUuid } from '../../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('mechanics/actions/delete'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to delete action.',
};

const successAlert = {
  id: generateFingerprintUuid('mechanics/actions/delete'),
  alertStyle: 'danger',
  dismissible: true,
  message: 'Successfully deleted action.',
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
