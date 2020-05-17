import { addAlert } from '../../../../alerts/store/actions';
import { generateFingerprintUuid } from '../../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('mechanics/actions/show'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to find action.',
};

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(failureAlert);

    dispatch(action);
  },
};
