import { convertToArray } from '../../utils/array';
import { valueOrDefault } from '../../utils/object';
import {
  camelize,
  underscore,
} from '../../utils/string';

export const formatErrors = (errors) => {
  if (typeof errors === 'undefined') { return {}; }
  if (errors === null) { return {}; }

  const formatted = {};

  errors.forEach((tuple) => {
    const property = camelize(tuple[0]);
    const message = tuple[1];

    if (!formatted[property]) { formatted[property] = []; }

    formatted[property].push(message);
  });

  return formatted;
};

export const generateFieldId = (opts) => {
  const { inputId, path, prop } = opts;
  const suffix = valueOrDefault(opts.suffix, 'input');

  if (inputId) { return inputId; }

  const segments = convertToArray(path).slice();

  segments.push(prop);

  segments.push(suffix);

  return segments
    .map(str => underscore(str).replace(/_/g, '-'))
    .join('-');
};

export const getInputValue = ({ checked, type, value }) => {
  if (type === 'checkbox') { return checked; }

  return value;
};

export const coerceInputValue = (handler, fn) => (
  (event) => {
    const { target } = event;
    const value = fn(getInputValue(target));

    return handler({ target: { value } });
  }
);
