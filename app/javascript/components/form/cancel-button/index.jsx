import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import LinkButton from '../../link-button';
import {
  dig,
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { underscore } from '../../../utils/string';

const findProp = ({ data, path, propName }) => {
  const actualPath = valueOrDefault(path, []);

  return dig(data, ...actualPath, propName);
};

const cancelUrl = ({
  baseUrl,
  form,
  isUpdate,
  propName,
  resourceName,
}) => {
  const url = valueOrDefault(baseUrl, `/${resourceName}`);

  if (!isUpdate) { return url; }

  const prop = findProp({ ...form, propName });

  return exists(prop) ? `${url}/${prop}` : url;
};

const FormCancelButton = (props) => {
  const {
    baseUrl,
    form,
    isUpdate,
    propName,
    resourceName,
  } = props;
  const pluralResourceName = underscore(pluralize(resourceName));
  const url = cancelUrl({
    baseUrl,
    isUpdate,
    form,
    propName,
    resourceName: pluralResourceName,
  });

  return (
    <LinkButton block outline buttonStyle="secondary" url={url}>
      Cancel
    </LinkButton>
  );
};

FormCancelButton.defaultProps = {
  baseUrl: null,
  isUpdate: false,
  propName: 'id',
};

FormCancelButton.propTypes = {
  baseUrl: PropTypes.string,
  form: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
  isUpdate: PropTypes.bool,
  propName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
};

export default FormCancelButton;
