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

const findId = ({ data, path }) => {
  const actualPath = valueOrDefault(path, []);

  return dig(data, ...actualPath, 'id');
};

const cancelUrl = ({
  baseUrl,
  form,
  isUpdate,
  resourceName,
}) => {
  const url = valueOrDefault(baseUrl, `/${resourceName}`);

  if (!isUpdate) { return url; }

  const id = findId(form);

  return exists(id) ? `${url}/${id}` : url;
};

const FormCancelButton = (props) => {
  const {
    baseUrl,
    form,
    isUpdate,
    resourceName,
  } = props;
  const pluralResourceName = underscore(pluralize(resourceName));
  const url = cancelUrl({
    baseUrl,
    isUpdate,
    form,
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
};

FormCancelButton.propTypes = {
  baseUrl: PropTypes.string,
  form: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
  isUpdate: PropTypes.bool,
  resourceName: PropTypes.string.isRequired,
};

export default FormCancelButton;
