import React from 'react';
import PropTypes from 'prop-types';

import FormSelectInput from '../../../../components/form/select-input';
import { hooks } from '../../../store/formFindOrigins';
import { dig, exists, valueOrDefault } from '../../../../utils/object';

const { useEndpoint } = hooks;

export const mapSourceToValue = ({ data, path }) => {
  const source = valueOrDefault(dig(data, ...path, 'source'), null);

  if (!exists(source)) return '';

  const { originType, originId } = source;

  if (!exists(originType) || !exists(originId)) return '';

  return `${originType}:${originId}`;
};

export const mapValueToSource = ({ value }) => {
  if (!exists(value)) { return {}; }

  const segments = value.split(':');
  const originType = segments[0];
  const originId = segments[1];

  if (!exists(originId) || !exists(originType)) { return {}; }

  if (originId.length === 0 || originType.length === 0) { return {}; }

  return { source: { originId, originType } };
};

const generateOriginOptionsForBooks = (books) => {
  if (!exists(books)) { return []; }

  return books.map(book => ({
    label: book.title,
    value: `Book:${book.id}`,
  }));
};

const generateOriginOptions = ({ books }) => ([
  {
    label: 'Books',
    value: generateOriginOptionsForBooks(books),
  },
]);

const SpellFormSelectSourceField = (props) => {
  const { data } = useEndpoint();

  return (
    <FormSelectInput {...props} defaultOption="Homebrew" options={generateOriginOptions(data)} />
  );
};

SpellFormSelectSourceField.defaultProps = {};

SpellFormSelectSourceField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SpellFormSelectSourceField;
