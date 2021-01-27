import { shallowEqual, useSelector } from 'react-redux';

import { actions } from './find';
import { dig } from '../../../../utils/object';

const initialState = { spells: [] };
const namespace = 'spells/index/data';

const { REQUEST_SUCCESS } = actions;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
};

const selector = state => dig(state, ...namespace.split('/'));

const useData = (fn = state => state) => useSelector(
  state => fn(selector(state)),
  shallowEqual,
);

export const hooks = { useData };
