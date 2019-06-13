import fetch from 'cross-fetch';
import {
  requestCreateSpellFailure,
  requestCreateSpellPending,
  requestCreateSpellSuccess,
  requestFindSpellFailure,
  requestFindSpellPending,
  requestFindSpellSuccess,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
} from './actions';
import {
  addAlert,
} from '../../components/alerts/store/actions';
import {
  camelizeKeys,
  underscoreKeys,
} from '../../utils/object';
import {
  generateFingerprintUuid,
} from '../../utils/uuid';

export const SPELLS_API_URL = '/api/spells';

const handleRequestCreateSpellFailure = dispatch => () => {
  const action = requestCreateSpellFailure();

  dispatch(action);

  const alert = {
    id: generateFingerprintUuid('spells/create'),
    alertStyle: 'warning',
    dismissible: true,
    message: 'Unable to create spell.',
  };
  dispatch(addAlert(alert));
};

const handleRequestCreateSpellSuccess = dispatch => async (response) => {
  const json = await response.json();
  const { spell } = camelizeKeys(json.data);
  const action = requestCreateSpellSuccess(spell);

  dispatch(action);

  const alert = {
    id: generateFingerprintUuid('spells/create'),
    alertStyle: 'success',
    dismissible: true,
    message: 'Successfully created spell.',
  };
  dispatch(addAlert(alert));
};

const handleRequestCreateSpellResponse = dispatch => (response) => {
  if (response.ok) {
    handleRequestCreateSpellSuccess(dispatch)(response);
  } else {
    handleRequestCreateSpellFailure(dispatch)(response);
  }
};

const handleRequestFindSpellFailure = dispatch => () => {
  const action = requestFindSpellFailure();

  dispatch(action);
};

const handleRequestFindSpellSuccess = dispatch => async (response) => {
  const json = await response.json();
  const { spell } = camelizeKeys(json.data);
  const action = requestFindSpellSuccess(spell);

  dispatch(action);
};

const handleRequestFindSpellResponse = dispatch => (response) => {
  if (response.ok) {
    handleRequestFindSpellSuccess(dispatch)(response);
  } else {
    handleRequestFindSpellFailure(dispatch)(response);
  }
};

const handleRequestSpellsFailure = dispatch => () => {
  const action = requestSpellsFailure();

  dispatch(action);
};

const handleRequestSpellsSuccess = dispatch => async (response) => {
  const json = await response.json();
  const { spells } = camelizeKeys(json.data);
  const action = requestSpellsSuccess(spells);

  dispatch(action);
};

const handleRequestSpellsResponse = dispatch => (response) => {
  if (response.ok) {
    handleRequestSpellsSuccess(dispatch)(response);
  } else {
    handleRequestSpellsFailure(dispatch)(response);
  }
};

export const requestCreateSpell = () => async (dispatch, getState) => {
  dispatch(requestCreateSpellPending());

  const state = getState();
  const { spells } = state;
  const { draftSpell } = spells;
  const data = underscoreKeys(draftSpell);

  const url = SPELLS_API_URL;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleRequestCreateSpellResponse(dispatch)(response);
};

export const requestFindSpell = spellId => async (dispatch) => {
  dispatch(requestFindSpellPending());

  const url = `${SPELLS_API_URL}/${spellId}`;
  const response = await fetch(url);

  return handleRequestFindSpellResponse(dispatch)(response);
};

export const requestSpells = () => async (dispatch) => {
  dispatch(requestSpellsPending());

  const response = await fetch(SPELLS_API_URL);

  return handleRequestSpellsResponse(dispatch)(response);
};
