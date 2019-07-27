import fetch from 'cross-fetch';
import { push } from 'connected-react-router';

import {
  requestFailure,
  requestPending,
  requestSuccess,
} from './actions';
import { addAlert } from '../../../components/alerts/store/actions';
import { formatErrors } from '../../../components/form/utils';
import {
  camelizeKeys,
  underscoreKeys,
} from '../../../utils/object';
import { generateFingerprintUuid } from '../../../utils/uuid';

export const SPELLS_API_URL = '/api/spells';

const handleRequestFailure = dispatch => async (response) => {
  const json = await response.json();
  const { errors } = json;

  dispatch(requestFailure(formatErrors(errors)));

  const alert = {
    id: generateFingerprintUuid('spells/create'),
    alertStyle: 'warning',
    dismissible: true,
    message: 'Unable to create spell.',
  };
  dispatch(addAlert(alert));
};

const handleRequestSuccess = dispatch => async (response) => {
  const json = await response.json();
  const { spell } = camelizeKeys(json.data);

  dispatch(requestSuccess(spell));

  const spellUrl = `/spells/${spell.id}`;
  dispatch(push(spellUrl));

  const alert = {
    id: generateFingerprintUuid('spells/create'),
    alertStyle: 'success',
    dismissible: true,
    message: 'Successfully created spell.',
  };
  dispatch(addAlert(alert));
};

const handleRequestResponse = dispatch => (response) => {
  if (response.ok) {
    handleRequestSuccess(dispatch)(response);
  } else {
    handleRequestFailure(dispatch)(response);
  }
};

export const performRequest = () => async (dispatch, getState) => {
  dispatch(requestPending());

  const state = getState();
  const { createSpell } = state;
  const data = underscoreKeys(createSpell.data);

  const url = SPELLS_API_URL;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleRequestResponse(dispatch)(response);
};
