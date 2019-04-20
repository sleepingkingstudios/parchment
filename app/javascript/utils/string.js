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

export const titleize = (str) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  return underscore(str).split(/[\s_]/).map(capitalize).join(' ');
};
