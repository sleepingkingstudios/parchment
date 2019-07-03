const isEmpty = (value) => {
  if (typeof value === 'undefined') { return true; }
  if (value === null) { return true; }
  if (value.length === 0) { return true; }

  return false;
};

export const addClassName = (...classNames) => {
  const nonEmptyClassNames = classNames.reduce((acc, className) => {
    if (!isEmpty(className)) { acc.push(className); }

    return acc;
  }, []);

  return nonEmptyClassNames.join(' ');
};

export const addClassNameToProps = (props, ...classNames) => {
  const className = addClassName(props.className, ...classNames);

  if (className.length === 0) { return props; }

  return Object.assign({}, props, { className });
};
