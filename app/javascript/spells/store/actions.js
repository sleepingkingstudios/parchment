const namespace = 'spells';

export const REQUEST_FIND_SPELL_FAILURE = `${namespace}/requestFindSpellFailure`;
export const REQUEST_FIND_SPELL_PENDING = `${namespace}/requestFindSpellPending`;
export const REQUEST_FIND_SPELL_SUCCESS = `${namespace}/requestFindSpellSuccess`;

export const REQUEST_SPELLS_FAILURE = `${namespace}/requestSpellsFailure`;
export const REQUEST_SPELLS_PENDING = `${namespace}/requestSpellsPending`;
export const REQUEST_SPELLS_SUCCESS = `${namespace}/requestSpellsSuccess`;

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
