import { convertToArray } from '../../utils/array';

const mapProperty = (ary, propName) => {
  if (typeof propName === 'undefined' || propName === null) { return ary; }

  return ary.map(item => item[propName]);
};

export const applyMiddleware = (original, middleware) => {
  if (middleware.length === 0) { return original; }

  let fn = original;

  middleware.reverse().forEach((middlewareFn) => { fn = middlewareFn(fn); });

  return fn;
};

export const selectMiddleware = (maybeMiddleware, propName) => {
  const middleware = convertToArray(maybeMiddleware);
  const selected = [];

  mapProperty(middleware, propName).forEach((item) => {
    if (typeof item === 'function') { selected.push(item); }
  });

  return selected;
};
