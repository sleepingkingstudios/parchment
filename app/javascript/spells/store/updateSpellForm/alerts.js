import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('spells/update'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to update spell.',
};

const successAlert = {
  id: generateFingerprintUuid('spells/update'),
  alertStyle: 'success',
  dismissible: true,
  message: 'Successfully updated spell.',
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
