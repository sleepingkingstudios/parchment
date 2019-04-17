export const isNumber = value => (Number(value) === value);

const shortOrdinalSuffix = (number) => {
  const mod = number % 100;

  if (mod === 11 || mod === 12 || mod === 13) { return 'th'; }

  const digit = mod % 10;

  switch (digit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const shortOrdinal = (number) => {
  if (typeof number === 'undefined' || number == null) { return ''; }

  if (!isNumber(number)) { return number.toString(); }

  const int = Math.round(number);
  const suffix = shortOrdinalSuffix(int);

  return `${int}${suffix}`;
};
