export const indexOfMatching = (ary, fn) => {
  let i;
  const len = ary.length;

  for (i = 0; i < len; i += 1) {
    if (fn(ary[i])) { return i; }
  }

  return -1;
};

export const humanizeList = (ary, opts = {}) => {
  if (typeof ary === 'undefined' || ary == null) { return ''; }

  const options = Object.assign(
    {
      conjunction: 'and',
      default: '',
    },
    opts,
  );

  if (!Array.isArray(ary)) { return ary.toString(); }

  if (ary.length === 0) { return options.default; }

  if (ary.length === 1) { return ary[0]; }

  if (ary.length === 2) { return ary.join(` ${options.conjunction} `); }

  const firstItems = ary.slice(0, -1);
  const lastItem = ary[ary.length - 1];

  return `${firstItems.join(', ')}, ${options.conjunction} ${lastItem}`;
};
