import { addAlert } from '../../../components/alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

const failureAlert = {
  id: generateFingerprintUuid('publications/update'),
  alertStyle: 'warning',
  dismissible: true,
  message: 'Unable to find publication.',
};

export default {
  handleFailure: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const action = addAlert(failureAlert);

    dispatch(action);
  },
};