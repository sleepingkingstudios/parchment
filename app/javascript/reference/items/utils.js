import {
  capitalize,
  underscore,
} from 'utils/string';

// eslint-disable-next-line import/prefer-default-export
export const formatType = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  const segments = str.split('::');

  return underscore(segments[segments.length - 1])
    .split(/[_ ]/)
    .map(capitalize)
    .join(' ');
};
