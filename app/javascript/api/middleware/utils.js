import { convertToArray } from '../../utils/array';

const mapProperty = (ary, propName) => {
  if (typeof propName === 'undefined' || propName === null) { return ary; }

  return ary.map(item => item[propName]);
};

const injectMiddlewareAfter = (ary, middleware, target) => {
  const copy = ary.slice();

  if (target === ':all') {
    copy.splice(target.length, 0, middleware);

    return copy;
  }

  const index = ary.findIndex(item => (item.type === target));

  if (index === -1) {
    throw new Error(`Unable to inject middleware after "${target}"`);
  }

  copy.splice(index + 1, 0, middleware);

  return copy;
};

const injectMiddlewareBefore = (ary, middleware, target) => {
  const copy = ary.slice();

  if (target === ':all') {
    copy.splice(0, 0, middleware);

    return copy;
  }

  const index = ary.findIndex(item => (item.type === target));

  if (index === -1) {
    throw new Error(`Unable to inject middleware before "${target}"`);
  }

  copy.splice(index, 0, middleware);

  return copy;
};

const applyDirective = (ary, directive) => {
  const { middleware } = directive;

  if (directive.after) {
    return injectMiddlewareAfter(ary, middleware, directive.after);
  }

  if (directive.before) {
    return injectMiddlewareBefore(ary, middleware, directive.before);
  }

  return ary;
};

export const applyMiddleware = (original, middleware) => {
  if (middleware.length === 0) { return original; }

  let fn = original;

  middleware.reverse().forEach((middlewareFn) => { fn = middlewareFn(fn); });

  return fn;
};

export const injectMiddleware = (middleware, directives) => (
  directives.reduce(applyDirective, middleware)
);

export const selectMiddleware = (maybeMiddleware, propName) => {
  const middleware = convertToArray(maybeMiddleware);
  const selected = [];

  mapProperty(middleware, propName).forEach((item) => {
    if (typeof item === 'function') { selected.push(item); }
  });

  return selected;
};

export const wrapMiddleware = (middleware, next) => {
  if (typeof middleware !== 'function') { return next; }

  return middleware(next);
};
