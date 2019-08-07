const namespace = 'spells';

export const REQUEST_SPELLS_FAILURE = `${namespace}/requestSpellsFailure`;
export const REQUEST_SPELLS_PENDING = `${namespace}/requestSpellsPending`;
export const REQUEST_SPELLS_SUCCESS = `${namespace}/requestSpellsSuccess`;

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
