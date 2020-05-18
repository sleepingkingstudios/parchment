const convertTense = ({ defaultValue, rules, word }) => {
  let pattern;
  let replace;

  for (let i = 0; i < rules.length; i += 1) {
    [pattern, replace] = rules[i];

    if (word.match(pattern)) { return word.replace(pattern, replace); }
  }

  return defaultValue;
};

const preserveCase = (word, converted) => (
  word[word.length - 1].match(/[A-Z]/) ? converted.toUpperCase() : converted
);

const pastTenseRules = [
  [/(\w+)e$/i, '$1ed'],
  [/(\w+)ind$/i, '$1ound'],
];

export const pastTense = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }
  if (word === '') { return ''; }

  return preserveCase(
    word,
    convertTense({
      defaultValue: `${word}ed`,
      rules: pastTenseRules,
      word,
    }),
  );
};

const progressiveTenseRules = [
  [/(\w+)e$/i, '$1ing'],
];

export const progressiveTense = (word) => {
  if (typeof word === 'undefined' || word == null) { return ''; }
  if (word === '') { return ''; }

  return preserveCase(
    word,
    convertTense({
      defaultValue: `${word}ing`,
      rules: progressiveTenseRules,
      word,
    }),
  );
};
