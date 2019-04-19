export const capitalize = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const truncate = (str, len) => {
  if (typeof str === 'undefined' || str == null) { return ''; }

  if (str.length <= len) { return str; }

  return `${str.slice(0, len - 3)}...`;
};
