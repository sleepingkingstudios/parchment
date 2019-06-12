const namespace = 'spells';

export const REQUEST_CREATE_SPELL_FAILURE = `${namespace}/requestCreateSpellFailure`;
export const REQUEST_CREATE_SPELL_PENDING = `${namespace}/requestCreateSpellPending`;
export const REQUEST_CREATE_SPELL_SUCCESS = `${namespace}/requestCreateSpellSuccess`;

export const REQUEST_FIND_SPELL_FAILURE = `${namespace}/requestFindSpellFailure`;
export const REQUEST_FIND_SPELL_PENDING = `${namespace}/requestFindSpellPending`;
export const REQUEST_FIND_SPELL_SUCCESS = `${namespace}/requestFindSpellSuccess`;

export const REQUEST_SPELLS_FAILURE = `${namespace}/requestSpellsFailure`;
export const REQUEST_SPELLS_PENDING = `${namespace}/requestSpellsPending`;
export const REQUEST_SPELLS_SUCCESS = `${namespace}/requestSpellsSuccess`;

export const UPDATE_SPELL_FORM_FIELD = `${namespace}/updateSpellFormField`;

export const requestCreateSpellFailure = () => ({
  type: REQUEST_CREATE_SPELL_FAILURE,
});

export const requestCreateSpellPending = () => ({
  type: REQUEST_CREATE_SPELL_PENDING,
});

export const requestCreateSpellSuccess = spell => ({
  type: REQUEST_CREATE_SPELL_SUCCESS,
  payload: { spell },
});

export const requestFindSpellFailure = () => ({
  type: REQUEST_FIND_SPELL_FAILURE,
});

export const requestFindSpellPending = () => ({
  type: REQUEST_FIND_SPELL_PENDING,
});

export const requestFindSpellSuccess = spell => ({
  type: REQUEST_FIND_SPELL_SUCCESS,
  payload: { spell },
});

export const requestSpellsFailure = () => ({
  type: REQUEST_SPELLS_FAILURE,
});

export const requestSpellsPending = () => ({
  type: REQUEST_SPELLS_PENDING,
});

export const requestSpellsSuccess = spells => ({
  type: REQUEST_SPELLS_SUCCESS,
  payload: { spells },
});

export const updateSpellFormField = ({ propName, value }) => ({
  type: UPDATE_SPELL_FORM_FIELD,
  payload: { propName, value },
});
