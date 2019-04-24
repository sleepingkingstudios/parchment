import { underscore } from '../../utils/string';

/* eslint-disable-next-line import/prefer-default-export */
export const generateFieldId = ({ inputId, namespace, prop }) => {
  if (inputId) { return inputId; }

  const segments = [];

  if (namespace) { segments.push(namespace); }

  segments.push(underscore(prop).replace(/_/g, '-'));

  segments.push('input');

  return segments.join('-');
};
