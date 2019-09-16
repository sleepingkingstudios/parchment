import {
  camelize,
  underscore,
} from './string';

const copyObjectOrArray = (obj) => {
  if (Array.isArray(obj)) { return obj.slice(); }

  return Object.assign({}, obj);
};

const guardArrayIndex = (ary, index) => {
  if (!Array.isArray(ary) || Number.isInteger(index)) { return; }

  throw new Error(`invalid Array index ${index}`);
};

const isPrimitive = (obj) => {
  if (obj === null || obj === true || obj === false) { return true; }

  const type = typeof obj;

  if (type === 'string' || type === 'number') { return true; }

  return false;
};

const maybeInteger = (key, defaultValue) => {
  if (typeof key === 'undefined' || key === null) { return defaultValue; }

  const int = parseInt(key, 10);

  return (int.toString() === key) ? int : key;
};

export const exists = obj => !(obj === null || typeof obj === 'undefined');

const recursivelyMapKeys = (obj, fn) => {
  if (!exists(obj)) { return obj; }

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

export const assign = (obj, value, ...path) => {
  if (path.length === 0) { throw new Error("path can't be blank"); }

  const last = path.pop();
  const root = copyObjectOrArray(obj);
  let current = root;

  path.forEach((segment, index) => {
    const key = maybeInteger(segment);
    const next = maybeInteger(path[index + 1], last);

    if (Object.prototype.hasOwnProperty.call(current, key)) {
      guardArrayIndex(current, key);

      current[key] = copyObjectOrArray(current[key]);
    } else {
      current[key] = Number.isInteger(next) ? [] : {};
    }

    current = current[key];
  });

  const key = maybeInteger(last);

  guardArrayIndex(current, key);

  current[key] = value;

  return root;
};

export const camelizeKeys = obj => (
  exists(obj) ? recursivelyMapKeys(obj, camelize) : {}
);

export const underscoreKeys = obj => (
  exists(obj) ? recursivelyMapKeys(obj, underscore) : {}
);

export const valueOrDefault = (obj, defaultValue = null) => (
  exists(obj) ? obj : defaultValue
);

export const dig = (obj, ...path) => {
  if (path.length === 0) { return obj; }

  const childName = path[0];

  if (!Object.prototype.hasOwnProperty.call(obj, childName)) { return null; }

  return dig(obj[childName], ...path.slice(1));
};
