import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('authentication/login'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Username or password is not valid.',
};

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(failureAlert);

    dispatch(action);
  },
};
