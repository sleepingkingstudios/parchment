import React from 'react';

import { exists } from './object';

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

export const injectProps = (Component, defaultProps) => {
  if (!exists(defaultProps)) { return Component; }

  const { className, ...rest } = defaultProps;
  const ComponentWithInjectedProps = props => (
    <Component {...rest} {...addClassNameToProps(props, className)} />
  );

  return ComponentWithInjectedProps;
};

const responsiveSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const parseResponsiveStyles = (classNames) => {
  const responsiveStyles = { xs: true };

  classNames.split(' ').forEach((className) => {
    if (!className.match(/^d-/)) { return; }

    const defaultMatch = className.match(/^d-(\w+)$/);

    if (defaultMatch) {
      const [, style] = defaultMatch;

      responsiveStyles.xs = style;
    }

    const sizeMatch = className.match(/^d-(\w\w)-(\w+)/);

    if (sizeMatch) {
      const [, size, style] = sizeMatch;

      responsiveStyles[size] = style;
    }
  });

  return responsiveStyles;
};

const isVisible = (className, size) => {
  if (typeof className === 'undefined') { return true; }

  const responsiveStyles = parseResponsiveStyles(className);
  const sizeIndex = responsiveSizes.indexOf(size);

  for (let i = sizeIndex; i >= 0; i -= 1) {
    const currentSize = responsiveSizes[i];
    const style = responsiveStyles[currentSize];

    if (style) { return style !== 'none'; }
  }

  return true;
};

export const responsiveText = (wrapper, size) => {
  const children = wrapper.children();

  if (children.length === 0) { return wrapper.text(); }

  if (!isVisible(wrapper.prop('className'), size)) { return ''; }

  let buffer = '';

  wrapper.children().forEach((child) => {
    buffer += responsiveText(child, size);
  });

  return buffer;
};
