import fetch from 'cross-fetch';
import {
  requestSpellsFailure,
  requestSpellsPending,
  requestSpellsSuccess,
} from './actions';

export const SPELLS_API_URL = '/api/spells';

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

export const requestSpells = () => async (dispatch) => {
  dispatch(requestSpellsPending());

  const response = await fetch(SPELLS_API_URL);

  return handleRequestSpellsResponse(dispatch)(response);
};
