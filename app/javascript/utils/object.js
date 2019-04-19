import {
  camelize,
  underscore,
} from './string';

const isPrimitive = (obj) => {
  if (obj === null || obj === true || obj === false) { return true; }

  const type = typeof obj;

  if (type === 'string' || type === 'number') { return true; }

  return false;
};

const recursivelyMapKeys = (obj, fn) => {
  if (isPrimitive(obj)) { return obj; }

  if (Array.isArray(obj)) {
    return obj.map(item => recursivelyMapKeys(item, fn));
  }

  const mapped = {};

  Object.entries(obj).forEach(([key, value]) => {
    mapped[fn(key)] = recursivelyMapKeys(value, fn);
  });

  return mapped;
};

export const camelizeKeys = (obj) => {
  if (typeof obj === 'undefined' || obj == null) { return {}; }

  return recursivelyMapKeys(obj, camelize);
};

export const underscoreKeys = (obj) => {
  if (typeof obj === 'undefined' || obj == null) { return {}; }

  return recursivelyMapKeys(obj, underscore);
};
