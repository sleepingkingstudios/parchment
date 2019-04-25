import { underscore } from '../../utils/string';

export const generateFieldId = ({ inputId, namespace, prop }) => {
  if (inputId) { return inputId; }

  const segments = [];

  if (namespace) { segments.push(namespace); }

  segments.push(underscore(prop).replace(/_/g, '-'));

  segments.push('input');

  return segments.join('-');
};

export const getInputValue = ({ checked, type, value }) => {
  if (type === 'checkbox') { return checked; }

  return value;
};
