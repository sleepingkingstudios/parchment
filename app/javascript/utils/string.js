const articles = ['of', 'on', 'the'];

const camelizeMatch = (match, p1, p2) => {
  if (p2) { return p2.toUpperCase(); }

  return p1.toLowerCase();
};

export const camelize = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, camelizeMatch);
};

export const capitalize = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const interpolate = (str, rxp, params) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  if (typeof rxp === 'undefined' || rxp == null) { return str; }

  return str.replace(rxp, (_, key) => params[key]);
};

export const safeCapitalize = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const slugify = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  if (str.length === 0) { return ''; }

  return str
    .trim()
    .toLowerCase()
    .split(/[\s\-_]+/)
    .map(word => word.replace(/[^a-z0-9]/g, ''))
    .filter((word) => {
      if (word.length === 0) { return false; }

      return !articles.includes(word);
    })
    .join('-');
};

export const truncate = (str, len) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  if (str.length <= len) { return str; }

  return `${str.slice(0, len - 3)}...`;
};

export const underscore = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  return str
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1_$2')
    .toLowerCase();
};

export const upperCamelize = (str) => {
  const camel = camelize(str);

  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

export const titleize = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  return underscore(str).split(/[\s_]/).map(capitalize).join(' ');
};
