import {
  isNumber,
} from './number';
import {
  camelize,
  underscore,
} from './string';

const copyObjectOrArray = (obj) => {
  if (Array.isArray(obj)) { return obj.slice(); }

  return Object.assign({}, obj);
};

const findOrCreateChild = (obj, childName, grandchildName) => {
  const expectArray = isNumber(grandchildName);

  if (!Object.prototype.hasOwnProperty.call(obj, childName)) {
    return expectArray ? [] : {};
  }

  const isArray = Array.isArray(obj[childName]);

  if (expectArray && !isArray) {
    throw new Error('expected Array but child is Object');
  } else if (!expectArray && isArray) {
    throw new Error('expected Object but child is Array');
  }

  return obj[childName];
};

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

export const valueOrDefault = (obj, defaultValue = null) => {
  if (typeof obj === 'undefined' || obj === null) { return defaultValue; }

  return obj;
};

export const deepAccessProperty = (obj, propName, maybePath) => {
  const path = valueOrDefault(maybePath, []).slice();

  if (path.length === 0) { return valueOrDefault(obj[propName]); }

  const childName = path.shift();

  if (!Object.prototype.hasOwnProperty.call(obj, childName)) { return null; }

  return deepAccessProperty(obj[childName], propName, path);
};

export const deepAssignProperty = (obj, propName, value, maybePath) => {
  const path = valueOrDefault(maybePath, []).slice();
  const copy = copyObjectOrArray(obj);

  if (path.length === 0) {
    copy[propName] = value;

    return copy;
  }

  const childName = path.shift();
  const grandchildName = valueOrDefault(path[0], propName);
  const child = findOrCreateChild(copy, childName, grandchildName);

  copy[childName] = deepAssignProperty(child, propName, value, path);

  return copy;
};
