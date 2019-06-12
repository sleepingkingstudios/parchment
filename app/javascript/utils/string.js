/* eslint-disable-next-line import/prefer-default-export */
export const capitalize = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
