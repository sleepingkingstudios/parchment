const namespace = 'spells/create';

export const REQUEST_FAILURE = `${namespace}/requestFailure`;
export const REQUEST_PENDING = `${namespace}/requestPending`;
export const REQUEST_SUCCESS = `${namespace}/requestSuccess`;
export const UPDATE_FORM_FIELD = `${namespace}/updateFormField`;

export const requestFailure = errors => ({
  type: REQUEST_FAILURE,
  payload: { errors },
});

export const requestPending = () => ({
  type: REQUEST_PENDING,
  payload: {},
});

export const requestSuccess = data => ({
  type: REQUEST_SUCCESS,
  payload: { data },
});

export const updateFormField = ({ propName, value }) => ({
  type: UPDATE_FORM_FIELD,
  payload: { propName, value },
});
