import fetch from 'cross-fetch';
import {
  requestFindSpellFailure,
  requestFindSpellPending,
  requestFindSpellSuccess,
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
} from './actions';

export const SPELLS_API_URL = '/api/spells';

const handleRequestFindSpellFailure = dispatch => () => {
  const action = requestFindSpellFailure();

  dispatch(action);
};

const handleRequestFindSpellSuccess = dispatch => async (response) => {
  const json = await response.json();
  const { spell } = json.data;
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
  const { spells } = json.data;
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
