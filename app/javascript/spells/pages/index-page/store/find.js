import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';

import { INITIALIZED } from '../../../../api/status';
import { dig } from '../../../../utils/object';

// TODO: This should be brought in under the request.
import generateActions from '../../../../api/client/actions';

// TODO: This should be brought in under the request.
import generateReducer from '../../../../api/findMany/reducer';

import generateRequest from '../../../../api/client/request';

const initialState = {
  data: {},
  errors: {},
  status: INITIALIZED,
};
const namespace = 'spells/index/find';
const url = 'api/spells';

export const actions = generateActions({ namespace });
const request = generateRequest({
  actions,
  method: 'GET',
  namespace,
  url,
});
const { performRequest } = request;

const useFindRequest = (params, skip = []) => () => {
  const dispatch = useDispatch();
  const { getState } = useStore();

  useEffect(
    () => { performRequest(params)(dispatch, getState); },
    skip,
  );
};

const selector = state => dig(state, ...namespace.split('/'));

const useFindStatus = (fn = state => state) => useSelector(
  state => fn(dig(selector(state), 'status')),
  shallowEqual,
);

export const hooks = { useFindRequest, useFindStatus, useStore };

export const reducer = generateReducer({
  actions,
  initialState,
});
