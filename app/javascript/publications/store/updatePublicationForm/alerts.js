import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('publications/update'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to update publication.',
};

const successAlert = {
  id: generateFingerprintUuid('publications/update'),
  alertStyle: 'success',
  dismissible: true,
  message: 'Successfully updated publication.',
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
