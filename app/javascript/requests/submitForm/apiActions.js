import fetch from 'cross-fetch';
import { formatErrors } from '../../components/form/utils';
import {
  camelizeKeys,
  underscoreKeys,
} from '../../utils/object';

const generateApiActions = ({ actions, namespace, url }) => {
  const REQUEST_URL = url;

  const {
    requestPending,
    requestFailure,
    requestSuccess,
  } = actions;

  const handleRequestSubmitFormFailure = dispatch => async (response) => {
    const json = await response.json();
    const { errors } = json;

    dispatch(requestFailure(formatErrors(errors)));
  };

  const handleRequestSubmitFormPending = dispatch => () => {
    dispatch(requestPending());
  };

  const handleRequestSubmitFormSuccess = dispatch => async (response) => {
    const json = await response.json();
    const { spell } = camelizeKeys(json.data);

    dispatch(requestSuccess(spell));
  };

  const requestSubmitForm = () => async (dispatch, getState) => {
    handleRequestSubmitFormPending(dispatch)();

    const state = getState();
    const data = underscoreKeys(state[namespace].data);

    const response = await fetch(REQUEST_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      handleRequestSubmitFormSuccess(dispatch)(response);
    } else {
      handleRequestSubmitFormFailure(dispatch)(response);
    }
  };

  return {
    REQUEST_URL,
    requestSubmitForm,
  };
};

export default generateApiActions;
