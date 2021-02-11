import { combineReducers } from 'redux';

import {
  exists,
  isEmpty,
} from 'utils/object';

const extractReducers = resources => Object.entries(resources).reduce(
  (reducers, tuple) => {
    const [key, { reducer }] = tuple;

    if (exists(reducer)) {
      const scoped = {};

      scoped[key] = reducer;

      return Object.assign(scoped, reducers);
    }

    return reducers;
  },
  {},
);

const generateReducer = (resources) => {
  const reducers = extractReducers(resources);

  if (isEmpty(reducers)) { return null; }

  return combineReducers(reducers);
};

export default generateReducer;
